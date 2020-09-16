#include <vector>

#include "core.h"

using namespace std;


// OTHER VECTOR OPERATIONS /////////////////////////////////////////////////////

Scalar norm(const Vector &v) noexcept {
    return sqrt(inner_prod(v, v));
}

Vector proj(const Vector &u, const Vector &v) noexcept {
    return inner_prod(v, u) / inner_prod(u, u) * u;
}
Vector perp(const Vector &u, const Vector &v) noexcept {
    return v - proj(u, v);
}

Vector scaled(const Vector &v, const Scalar len) noexcept {
    const Scalar factor = len / norm(v);
    return factor * v;
}
Vector &scale(Vector &v, const Scalar len) noexcept {
    const Scalar factor = len / norm(v);
    return v *= factor;
}


// OTHER MATRIX OPERATIONS /////////////////////////////////////////////////////

Matrix transpose(const Matrix &a) noexcept {
    Matrix result{Vector(a.size()), a[0].size()};
    for (size_t i = 0; i < result.size(); ++i) {
        for (size_t j = 0; j < result[i].size(); ++j) {
            result[i][j] = a[j][i];
        }
    }
    return result;
}
