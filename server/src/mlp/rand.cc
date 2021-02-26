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

void gram_schmidt(Matrix &basis, size_t dimensions, size_t start, size_t end) {
    for (size_t i = start; i < end; ++i) {
        bool success = false;
        while (!success) {
            basis[i] = randVector(dimensions);
            for (size_t j = start; j < i; ++j) {
                basis[i] -= proj(basis[j], basis[i])
            }
            basis[i] -=
        }
    }
}
Matrix randOrthoMatrix(size_t h, size_t w) {
    Matrix mat(h);
    for (size_t h = 0; h < )
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
