#include <cstddef>
#include <random>
#include <vector>

#include "linalg.h"

#include "rand.h"

using namespace std;


default_random_engine gen{};


// Linear Algebra

uniform_real_distribution<double> pm1(-1.0, 1.0);

Scalar randScalar() {
    return pm1(gen);
}

Vector randVector(size_t n) {
    Vector vec(n);
    for (double &x : vec) {
        x = randScalar();
    }
    return vec;
}

Matrix randMatrix(size_t h, size_t w) {
    Matrix mat(h);
    for (Vector &row : mat) {
        row = randVector(w);
    }
    return mat;
}


// Sampling

vector<pair<Vector, Vector>> _data{};

uniform_int_distribution<size_t> idx(0, 0);

void registerSample(const Vector &in, const Vector &out) {
    _data.emplace_back(in, out);
    idx = uniform_int_distribution<size_t>(0, _data.size() - 1);
}
const pair<Vector, Vector> &randSample() {
    return _data[idx(gen)];
}
