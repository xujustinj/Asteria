#include <istream>
#include <ostream>
#include <sstream>
#include <string>
#include <vector>

#include "layer.h"
#include "linalg/core.h"

#include "mlp.h"

using namespace std;


MultiLayerPerceptron::MultiLayerPerceptron(const vector<size_t> &widths) :
    layers{}
{
    vector<size_t>::const_iterator it = widths.begin();
    size_t last_width = *it;
    while (++it != widths.end()) {
        const size_t next_width = *it;
        layers.emplace_back(last_width, next_width);
        last_width = next_width;
    }
}

MultiLayerPerceptron::MultiLayerPerceptron(std::istream &in) : layers{} {
    in >> *this;
}


size_t MultiLayerPerceptron::in_width() const {
    return layers.front().in_width;
}
size_t MultiLayerPerceptron::out_width() const {
    return layers.back().out_width;
}

Vector MultiLayerPerceptron::eval(const Vector &in) const {
    Vector result = in;
    for (const Layer &layer : layers) {
        result = layer.eval(result);
    }
    return result;
}

Vector MultiLayerPerceptron::train(const Vector &in, const Vector &out) {
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
void MultiLayerPerceptron::learn(
    const double persistence,
    const double sensitivity,
    const double momentum
) {
    for (Layer &layer : layers) {
        layer.learn(
            persistence,
            sensitivity,
            momentum
        );
    }
}

istream &operator>>(istream &in, MultiLayerPerceptron &mlp) {
    mlp.layers.clear();

    vector<size_t> widths{};
    { // get layer widths from the input
        string s{};
        getline(in, s);
        istringstream iss{s};
        size_t width;
        while (iss >> width) {
            widths.emplace_back(width);
        }
    }

    vector<size_t>::const_iterator it = widths.begin();
    size_t last_width = *it;
    while (++it != widths.end()) {
        const size_t next_width = *it;
        mlp.layers.emplace_back(last_width, next_width, in);
        last_width = next_width;
    }
    return in;
}
ostream &operator<<(ostream &out, const MultiLayerPerceptron &mlp) {
    out << mlp.layers[0].in_width;
    for (const Layer &layer : mlp.layers) {
        out << ' ' << layer.out_width;
    }
    out << endl;
    for (const Layer &layer : mlp.layers) {
        out << layer;
    }
    return out;
}
