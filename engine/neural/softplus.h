#pragma once

#include "linalg/core.h"


// "softplus" smooth ReLU activation function

Scalar softplus(const Scalar x) noexcept;
Vector softplus(const Vector &v) noexcept;

// derivative of the softplus function
Scalar d_softplus(const Scalar x) noexcept;
Vector d_softplus(const Vector &v) noexcept;
