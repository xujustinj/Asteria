#ifndef LINALG_H
#define LINALG_H

#include <cstddef>
#include <istream>
#include <ostream>
#include <valarray>


// TYPE ALIASES ////////////////////////////////////////////////////////////////

using Scalar = double;

using Vector = std::valarray<double>;

// Matrix is a valarray of row vectors, such that `a[i][j]` is the entry in the
// ith row and jth column of a.
using Matrix = std::valarray<Vector>;


// PRODUCTS ////////////////////////////////////////////////////////////////////
// The general rule of products in this module is that `x *= y` and `x = y * x`
// are equivalent. This allows for intuitive syntax like `v *= a` to mean that
// we apply the matrix `a` as a transformation on `v`.

// Scalar-Vector products
Vector operator*(const Scalar c, const Vector &v);
Vector &operator*=(Vector &v, const Scalar &c); // v = c * v

// Matrix-Scalar products
Matrix operator*(const Scalar c, const Matrix &a);
Matrix &operator*=(Matrix &a, const Scalar &c); // a = c * a

// Vector-Vector products
Scalar iProd(const Vector &u, const Vector &v); // inner (dot) product
Matrix oProd(const Vector &u, const Vector &v); // outer product

// Matrix-Vector products
Vector operator*(const Matrix &a, const Vector &v);
Vector &operator*=(Vector &a, const Matrix &v); // v = a * v

// Matrix-Matrix products
Matrix &operator*(const Matrix &a, const Matrix &b);
Matrix &operator*=(Matrix &a, const Matrix &b); // a = b * a



Matrix transpose(const Matrix &mat);

// INPUT/OUTPUT ////////////////////////////////////////////////////////////////

std::istream &operator>>(std::istream &in, Vector &vec);
std::ostream &operator<<(std::ostream &out, const Vector &vec);

std::istream &operator>>(std::istream &in, Matrix &mat);
std::ostream &operator<<(std::ostream &out, const Matrix &mat);


#endif
