#pragma once

#include "core.h"


/**
 * Randomization in this linalg module naively generates Vector and Matrix
 * components and Scalars from a uniform [-1,1) distribution.
 */

Scalar rand_scalar();
Vector rand_vector(const size_t n);
Matrix rand_matrix(const size_t m, const size_t n); // m rows, n columns

// Randomizes a matrix consisting of clusters of n mutually-orthogonal column
// vectors, all scaled to the given length. If symmetry is true, then each
// vector's inverse is included as well.
Matrix rand_matrix_ortho(
    const size_t m, const size_t n,
    const bool symmetry = false,
    const Scalar len = 1.0
);
