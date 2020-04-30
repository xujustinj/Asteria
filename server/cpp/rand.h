#ifndef RAND_H
#define RAND_H

#include <cstddef>

#include "linalg.h"


// Linear Algebra

Scalar randScalar();

Vector randVector(size_t n);

Matrix randMatrix(size_t h, size_t w);


// Sampling

void registerSample(const Vector &in, const Vector &out);
const std::pair<Vector, Vector> &randSample();


#endif
