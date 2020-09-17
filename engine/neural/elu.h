#pragma once

#include "linalg/core.h"


/**
 * The exponential linear unit (ELU) activation function is a variant of the
 * rectified linear unit (ReLU) that approaches -1 (instead of 0) as the input
 * decreases.
 */

Scalar ELU(const Scalar x) noexcept;
Vector ELU(const Vector &v) noexcept;

// derivative of the ELU function
Scalar d_ELU(const Scalar x) noexcept;
Vector d_ELU(const Vector &v) noexcept;
