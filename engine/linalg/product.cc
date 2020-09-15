#include <valarray>

#include "core.h"

using namespace std;


// Scalar-Vector products
// nothing to implement

// Scalar-Matrix products
Matrix operator*(const Scalar c, const Matrix &a) {
    Matrix result(a.size());
    for (size_t i = 0; i < result.size(); ++i) {
        result[i] = c * a[i];
    }
    return result;
}
Matrix &operator*=(Matrix &a, const Scalar &c) {
    for (Vector &row : a) {
        row *= c;
    }
    return a;
}

// Vector-Vector products
Scalar inner_prod(const Vector &u, const Vector &v) {
    return (u * v).sum();
}
Matrix outer_prod(const Vector &u, const Vector &v) {
    Matrix result(u.size());
    for (size_t i = 0; i < result.size(); ++i) {
        result[i] = u[i] * v;
    }
    return result;
}

// Matrix-Vector products
Vector operator*(const Matrix &a, const Vector &v) {
    Vector result(a.size());
    for (size_t i = 0; i < result.size(); ++i) {
        result[i] = (a[i] * v).sum();
    }
    return result;
}
Vector &operator*=(Vector &v, const Matrix &a) {
    v = a * v;
    return v;
}

// Matrix-Matrix products
Matrix operator*(const Matrix &a, const Matrix &b);
Matrix operator*(const Matrix &a, const Matrix &b) {
    Matrix t = transpose(b);

    Matrix result(Vector(b[0].size()), a.size());
    for (size_t i = 0; i < result.size(); ++i) {
        for (size_t j = 0; j < result[i].size(); ++j) {
            result[i][j] = (a[i] * t[j]).sum();
        }
    }
    return result;
}
