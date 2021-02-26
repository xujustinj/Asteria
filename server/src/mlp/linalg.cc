#include <cstddef>
#include <istream>
#include <ostream>
#include <valarray>

#include "linalg.h"

using namespace std;




Matrix transpose(const Matrix &mat) {
    Matrix trans{Vector(mat.size()), mat[0].size()};
    for (size_t r = 0; r < trans.size(); ++r) {
        for (size_t c = 0; c < trans[r].size(); ++c) {
            trans[r][c] = mat[c][r];
        }
    }
    return trans;
}

Scalar dProd(const Vector &l, const Vector &r) {
    return (l * r).sum();
}
Matrix cProd(const Vector &l, const Vector &r) {
    Matrix mat(l.size());
    for (size_t i = 0; i < mat.size(); ++i) {
        mat[i] = l[i] * r;
    }
    return mat;
}

Scalar norm(const Vector &v) {
    return dProd(v, v);
}
Vector proj(const Vector &u, const Vector &v) {
    return dProd(v, u) / dProd(u, u) * u;
}


Matrix operator*(const Scalar &l, const Matrix &r) {
    Matrix mat(r.size());
    for (size_t i = 0; i < mat.size(); ++i) {
        mat[i] = l * r[i];
    }
    return mat;
}
Vector operator*(const Matrix &l, const Vector &r) {
    Vector vec(l.size());
    for (size_t i = 0; i < vec.size(); ++i) {
        vec[i] = (l[i] * r).sum();
    }
    return vec;
}

Matrix &operator*=(Matrix &l, const Scalar &r) {
    for (Vector &row : l) {
        row *= r;
    }
    return l;
}

istream &operator>>(istream &in, Vector &vec) {
    for (Scalar &x : vec) {
        in >> x;
    }
    return in;
}
ostream &operator<<(ostream &out, const Vector &vec) {
    auto it = begin(vec);
    out << *it;
    while (++it != end(vec)) {
        out << ' ' << *it;
    }
    return out;
}

istream &operator>>(istream &in, Matrix &mat) {
    for (Vector &row : mat) {
        in >> row;
    }
    return in;
}
ostream &operator<<(ostream &out, const Matrix &mat) {
    for (const Vector &row : mat) {
        out << row << endl;
    }
    return out;
}
