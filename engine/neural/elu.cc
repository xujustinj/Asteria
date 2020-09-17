#include <limits>

#include "linalg/core.h"

#include "elu.h"

using namespace std;


// All implementations in this file are branchless!

Scalar ELU(const Scalar x) noexcept {
    const bool negative = (x < 0);
    return (negative * (exp(x) - 1)) + (!negative * x);
}
Vector ELU(const Vector &v) noexcept {
    return Vector(v).apply(ELU);
}

Scalar d_ELU(const Scalar x) noexcept {
    const bool negative = (x < 0);
    return negative * exp(x) + !negative;
}
Vector d_ELU(const Vector &v) noexcept {
    return Vector(v).apply(d_ELU);
}
