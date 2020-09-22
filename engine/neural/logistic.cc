#include <limits>

#include "linalg/core.h"

#include "elu.h"

using namespace std;


// All implementations in this file are branchless!

Scalar standard_logistic(const Scalar x) noexcept {
    const bool negative = (x < 0);
    return (negative * exp(x) / (exp(x) + 1.0)) + (!negative * 1.0 / (1.0 + exp(-x)));
}
Vector standard_logistic(const Vector &v) noexcept {
    return Vector(v).apply(standard_logistic);
}

Scalar d_standard_logistic(const Scalar x) noexcept {
    return standard_logistic(x) * standard_logistic(-x);
}
Vector d_standard_logistic(const Vector &v) noexcept {
    return standard_logistic(v) * standard_logistic(-v);
}
