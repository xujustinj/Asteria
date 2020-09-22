#pragma once

#include "linalg/core.h"


/**
 * The standard logistic function is a sigmoid curve ranging from 0 (for the
 * most negative inputs) to 1 (for the most positive inputs).
 */

Scalar standard_logistic(const Scalar x) noexcept;
Vector standard_logistic(const Vector &v) noexcept;

// derivative of the standard logistic function
Scalar d_standard_logistic(const Scalar x) noexcept;
Vector d_standard_logistic(const Vector &v) noexcept;
