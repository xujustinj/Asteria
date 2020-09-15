#pragma once

#include <valarray>


// TYPE DEFINITIONS ////////////////////////////////////////////////////////////

using Scalar = double;

using Vector = std::valarray<double>;

// Matrix is a valarray of row vectors, such that `a[i][j]` is the entry in the
// ith row and jth column of a.
using Matrix = std::valarray<Vector>;


// PRODUCTS ////////////////////////////////////////////////////////////////////
/**
 * The general rule of products in this module is that `x *= y` and `x = y * x`
 * are equivalent. This allows for intuitive syntax like `v *= a` to mean that
 * we apply the matrix `a` as a transformation on `v`.
 */

// Scalar-Vector products
// (built-in) Vector operator*(const Scalar c, const Vector &v);
// (built-in) Vector &operator*=(Vector &v, const Scalar &c); // v = c * v

// Scalar-Matrix products
Matrix operator*(const Scalar c, const Matrix &a);
Matrix &operator*=(Matrix &a, const Scalar &c); // a = c * a

// Vector-Vector products
Scalar inner_prod(const Vector &u, const Vector &v); // inner (dot) product
Matrix outer_prod(const Vector &u, const Vector &v); // outer product

// Matrix-Vector products
Vector operator*(const Matrix &a, const Vector &v);
Vector &operator*=(Vector &a, const Matrix &v); // v = a * v

// Matrix-Matrix products
Matrix operator*(const Matrix &a, const Matrix &b);
Matrix &operator*=(Matrix &a, const Matrix &b); // a = b * a


// OTHER VECTOR OPERATIONS /////////////////////////////////////////////////////

Scalar norm(const Vector &v);

Vector proj(const Vector &u, const Vector &v);
Vector perp(const Vector &u, const Vector &v);

Vector scaled(const Vector &v, const Scalar len);
Vector &scale(Vector &v, const Scalar len);


// OTHER MATRIX OPERATIONS /////////////////////////////////////////////////////

Matrix transpose(const Matrix &a);
