#include "core.h"
#include "rand/core.h"

#include "rand.h"

using namespace std;


Scalar rand_scalar() {
    return uniform_pm();
}
Vector rand_vector(const size_t n) {
    Vector result(n);
    for (double &x : result) {
        x = rand_scalar();
    }
    return result;
}
Matrix rand_matrix(const size_t m, const size_t n) {
    Matrix result(m);
    for (Vector &row : result) {
        row = rand_vector(n);
    }
    return result;
}


// Fills up to n (n-dimensional) row vectors in Matrix a, all mutually
// orthogonal, starting from the given position. Scales each vector to length
// len.
size_t transposed_gram_schmidt(
    Matrix &a,
    const size_t n,
    const size_t start,
    const Scalar len
) {
    size_t end = (a.size() < start + n) ? a.size() : start + n;
    for (size_t i = start; i < end; ++i) {
        a[i] = rand_vector(n);
        for (size_t j = start; j < i; ++j) {
            a[i] -= proj(a[j], a[i]);
        }
        scale(a[i], len);
    }
    return end;
}

#include <iostream>
Matrix rand_matrix_ortho(
    const size_t m, const size_t n,
    const bool symmetry,
    const Scalar len
) {
    Matrix transposed(Vector(m), n);
    size_t i = 0;
    while (i < n) {
        const size_t start = i;
        const size_t end = transposed_gram_schmidt(transposed, m, start, len);
        i = end;
        if (symmetry) {
            for (size_t j = start; j < end; ++j) {
                if (i >= n) {
                    break;
                }
                transposed[i] = -transposed[j];
                ++i;
            }
        }
    }
    return transpose(transposed);
}
