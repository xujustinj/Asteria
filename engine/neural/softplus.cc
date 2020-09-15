#include <limits>

#include "linalg/core.h"

#include "softplus.h"

using namespace std;


// All implementations in this file are branchless!

Scalar softplus(const Scalar x) noexcept {
    const Scalar y = log(1.0 + exp(x));
    // infinity() is a constexpr, no further optimization needed
    const bool overflow = (y == numeric_limits<Scalar>::infinity());
    return (overflow * x) + (!overflow * y);
}
Vector softplus(const Vector &v) noexcept {
    return Vector(v).apply(softplus);
}

Scalar d_softplus(const Scalar x) noexcept {
    return 1.0 / (1.0 + exp(-x));
}
Vector d_softplus(const Vector &v) noexcept {
    return 1.0 / (1.0 + exp(-v));
}
