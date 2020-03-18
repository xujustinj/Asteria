#include <cstddef>

#include "linalg.h"

class Layer {
    size_t inWidth;
    size_t outWidth;

    Matrix w;
    Matrix dw;

    Vector b;
    Vector db;
};
