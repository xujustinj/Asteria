#pragma once

#include <valarray>


/**
 * This module focuses on maximizing speed. For this reason, the requirements of
 * the functions declared here are not actually asserted. Violating the
 * requirements is undefined behaviour that may crash the program.
 *
 * The other error that might occur is failure to allocate memory. This is
 * expected to be rare, so everything here is marked noexcept.
 */


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
// these are built-in so they can be overridden to noexcept
// (built-in) Vector operator*(const Scalar c, const Vector &v);
// (built-in) Vector &operator*=(Vector &v, const Scalar &c); // v = c * v

// Scalar-Matrix products
Matrix operator*(const Scalar c, const Matrix &a) noexcept;
Matrix &operator*=(Matrix &a, const Scalar &c) noexcept; // a = c * a

// Vector-Vector products
// requires: size of u == size of v
Scalar dot_prod(const Vector &u, const Vector &v) noexcept;
Scalar inner_prod(const Vector &u, const Vector &v) noexcept; // dot product
Matrix outer_prod(const Vector &u, const Vector &v) noexcept;

// Matrix-Vector products
// requires: width of a == size of v
Vector operator*(const Matrix &a, const Vector &v) noexcept;
Vector &operator*=(Vector &a, const Matrix &v) noexcept; // v = a * v

// Matrix-Matrix products
// requires: width of a == height of b
Matrix operator*(const Matrix &a, const Matrix &b) noexcept;
Matrix &operator*=(Matrix &a, const Matrix &b) noexcept; // a = b * a


// OTHER VECTOR OPERATIONS /////////////////////////////////////////////////////

Scalar norm(const Vector &v) noexcept;

// requires: size of u == size of v
Vector proj(const Vector &u, const Vector &v) noexcept; // of v, onto u
Vector perp(const Vector &u, const Vector &v) noexcept; // of v, w.r.t. u

Vector scaled(const Vector &v, const Scalar len) noexcept;
Vector &scale(Vector &v, const Scalar len) noexcept;


// OTHER MATRIX OPERATIONS /////////////////////////////////////////////////////

Matrix transpose(const Matrix &a) noexcept;
