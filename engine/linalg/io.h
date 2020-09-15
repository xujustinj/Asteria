#pragma once

#include <istream>
#include <ostream>

#include "core.h"


// SCALAR I/O //////////////////////////////////////////////////////////////////

// (built-in) std::istream &operator>>(std::istream &in, Scalar &c);
// (built-in) std::ostream &operator<<(std::istream &out, Scalar &c);


// VECTOR I/O //////////////////////////////////////////////////////////////////

std::istream &operator>>(std::istream &in, Vector &v);
std::ostream &operator<<(std::ostream &out, const Vector &v);


// MATRIX I/O //////////////////////////////////////////////////////////////////

std::istream &operator>>(std::istream &in, Matrix &a);
std::ostream &operator<<(std::ostream &out, const Matrix &a);
