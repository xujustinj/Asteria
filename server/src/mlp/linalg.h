#ifndef LINALG_H
#define LINALG_H

#include <cstddef>
#include <istream>
#include <ostream>
#include <valarray>


using Scalar = double;
using Vector = std::valarray<double>;
using Matrix = std::valarray<Vector>;

Matrix transpose(const Matrix &mat);

// dProd(l, r) is the dot product of l and r
Scalar dProd(const Vector &l, const Vector &r);
// mProd(l, r) is the matrix product of l and r: A where A_i,j = l[i] * r[j]
Matrix cProd(const Vector &l, const Vector &r);

// sProd(l, r) is the scalar product of l and r
Matrix operator*(const Scalar &l, const Matrix &r);
// vProd(l, r) is the matrix-vector product of l and r
Vector operator*(const Matrix &l, const Vector &r);

Matrix operator*=(Matrix &l, const Scalar &r);

std::istream &operator>>(std::istream &in, Vector &vec);
std::ostream &operator<<(std::ostream &out, const Vector &vec);

std::istream &operator>>(std::istream &in, Matrix &mat);
std::ostream &operator<<(std::ostream &out, const Matrix &mat);


#endif
