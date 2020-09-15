#include <iostream>
#include <ostream>

#include "core.h"

#include "io.h"

using namespace std;


// SCALAR I/O //////////////////////////////////////////////////////////////////
// (built-in) std::istream &operator>>(std::istream &in, Scalar &c);
// (built-in) std::ostream &operator<<(std::istream &out, Scalar &c);


// VECTOR I/O //////////////////////////////////////////////////////////////////
istream &operator>>(istream &in, Vector &v) {
    for (Scalar &x : v) {
        in >> x;
    }
    return in;
}
ostream &operator<<(ostream &out, const Vector &v) {
    const Scalar *it = begin(v);
    out << *it;
    while (++it != end(v)) {
        out << '\t' << *it;
    }
    return out;
}


// MATRIX I/O //////////////////////////////////////////////////////////////////
istream &operator>>(istream &in, Matrix &a) {
    for (Vector &row : a) {
        in >> row;
    }
    return in;
}
ostream &operator<<(ostream &out, const Matrix &a) {
    for (const Vector &row : a) {
        out << row << endl;
    }
    return out;
}
