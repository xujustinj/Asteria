#include <cstddef>
#include <istream>
#include <ostream>
#include <sstream>
#include <string>
#include <vector>

#include "linalg.h"
#include "rand.h"

#include "neural.h"

using namespace std;


// ReLU activation function
Vector ReLU(Vector vec) {
    return log(1.0 + exp(vec));
}
Vector dReLU(Vector vec) {
    return 1.0 / (1.0 + exp(-vec));
}


// Layer

// TODO: orthogonal Xavier initialization
Layer::Layer(size_t inWidth, size_t outWidth) :
    inWidth{inWidth}, outWidth{outWidth},
    w{randMatrix(outWidth, inWidth)}, b{randVector(outWidth)},
    dw(Vector(0.0, inWidth), outWidth), db(0.0, outWidth)
{}

Vector Layer::eval(const Vector &in) const {
    return ReLU(w * in + b);
}
Vector Layer::eval(const Vector &in, Vector &cache) const {
    cache = w * in + b;
    return ReLU(cache);
}
Vector Layer::back(const Vector &in, const Vector &cache, const Vector &delta) {
    Vector d = dReLU(cache) * delta;
    db += d;
    dw += cProd(d, in);
    return transpose(w) * d;
}

void Layer::learn(double sensitivity, double momentum) {
    b -= sensitivity * db;
    w -= sensitivity * dw;
    db *= momentum;
    dw *= momentum;
}

istream &operator>>(istream &in, Layer &layer) {
    for (int r = 0; r < layer.w.size(); ++r) {
        in >> layer.w[r] >> layer.b[r];
    }
    return in;
}
ostream &operator<<(ostream &out, const Layer &layer) {
    for (int r = 0; r < layer.w.size(); ++r) {
        out << layer.w[r] << '\t' << layer.b[r] << endl;
    }
    return out;
}


// MLP

MLP::MLP() : layers{} {}
MLP::MLP(initializer_list<size_t> widths) : layers{} {
    auto it = widths.begin();
    size_t last = *it;
    while (++it != widths.end()) {
        size_t next = *it;
        layers.emplace_back(last, next);
        last = next;
    }
}

Vector MLP::eval(const Vector &in) const {
    Vector result = in;
    for (const Layer &layer : layers) {
        result = layer.eval(result);
    }
    return result;
}
Vector MLP::train(const Vector &in, const Vector &out) {
    vector<Vector> results(layers.size());
    vector<Vector> caches(layers.size());
    results[0] = layers[0].eval(in, caches[0]);
    for (size_t i = 1; i < layers.size(); ++i) {
        results[i] = layers[i].eval(results[i-1], caches[i]);
    }
    Vector err = results.back() - out;
    Vector ret = err;
    for (size_t i = layers.size() - 1; i > 0; --i) {
        err = layers[i].back(results[i-1], caches[i], err);
    }
    layers[0].back(in, caches[0], err);
    return ret;
}
void MLP::learn(double sensitivity, double momentum) {
    for (Layer &layer : layers) {
        layer.learn(sensitivity, momentum);
    }
}

istream &operator>>(istream &in, MLP &mlp) {
    string s{};
    getline(in, s);
    istringstream iss{s};
    int last, next;
    iss >> last;
    while (iss >> next) {
        mlp.layers.emplace_back(last, next);
        last = next;
    }
    for (Layer &layer : mlp.layers) {
        in >> layer;
    }
    return in;
}
ostream &operator<<(ostream &out, const MLP &mlp) {
    for (const Layer &layer : mlp.layers) {
        out << layer;
    }
    return out;
}
