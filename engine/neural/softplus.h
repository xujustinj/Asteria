#pragma once

#include "linalg/core.h"


/**
 * The "softplus" activation function is a smooth version of the rectified
 * linear unit (ReLU).
 */

Scalar softplus(const Scalar x) noexcept;
Vector softplus(const Vector &v) noexcept;

// derivative of the softplus function
Scalar d_softplus(const Scalar x) noexcept;
Vector d_softplus(const Vector &v) noexcept;
