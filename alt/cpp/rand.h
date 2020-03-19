#ifndef RAND_H
#define RAND_H

#include <cstddef>

#include "linalg.h"


Scalar randScalar();

Vector randVector(size_t n);

Matrix randMatrix(size_t h, size_t w);


#endif
