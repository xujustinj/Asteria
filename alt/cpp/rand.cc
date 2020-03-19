#include <cstddef>
#include <random>

#include "linalg.h"

#include "rand.h"

using namespace std;


default_random_engine gen{};
uniform_real_distribution<double> u(-1.0, 1.0);

Scalar randScalar() {
    return u(gen);
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
