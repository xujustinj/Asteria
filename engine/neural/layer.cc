#include <istream>
#include <ostream>

#include "linalg/core.h"
#include "linalg/io.h"
#include "linalg/rand.h"
#include "elu.h"

#include "layer.h"

using namespace std;


Layer::Layer(const size_t in_width, const size_t out_width) :
    in_width{in_width}, out_width{out_width},
    w{rand_matrix_ortho(
        out_width, in_width,
        true,
        sqrt(2.0 * in_width / (in_width + out_width))
    )},
    dw(Vector(0.0, in_width), out_width),
    b(0.0, out_width),
    db(0.0, out_width)
{}

Layer::Layer(const size_t in_width, const size_t out_width, istream &in) :
    in_width{in_width}, out_width{out_width},
    w(Vector(in_width), out_width),
    dw(Vector(0.0, in_width), out_width),
    b(out_width),
    db(0.0, out_width)
{
    in >> *this;
}

Vector Layer::eval(const Vector &in) const {
    return ELU(w * in + b);
}
Vector Layer::eval(const Vector &in, Vector &cache) const {
    cache = w * in + b;
    return ELU(cache);
}

Vector Layer::back(const Vector &in, const Vector &cache, const Vector &delta) {
    const Vector d = d_ELU(cache) * delta;
    dw += outer_prod(d, in);
    db += d;
    return transpose(w) * d;
}

void Layer::learn(
    const Scalar weight_decay_factor,
    const Scalar step_size,
    const Scalar momentum_factor
) {
    w = (1 - weight_decay_factor) * w - step_size * dw;
    b -= step_size * db; // persistence only applies to weights
    dw *= momentum_factor;
    db *= momentum_factor;
}

istream &operator>>(istream &in, Layer &layer) {
    for (size_t r = 0; r < layer.w.size(); ++r) {
        in >> layer.w[r] >> layer.b[r];
    }
    return in;
}
ostream &operator<<(ostream &out, const Layer &layer) {
    for (size_t r = 0; r < layer.w.size(); ++r) {
        out << layer.w[r] << "\t\t" << layer.b[r] << endl;
    }
    return out;
}
