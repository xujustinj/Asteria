#pragma once

#include <istream>
#include <ostream>

#include "linalg/core.h"


// TODO: allow different layers to use different activation functions
class Layer {
  public:
    const size_t in_width;
    const size_t out_width;

  private:
    // weights
    Matrix w;
    Matrix dw; // TODO: restructure this so that training can be parallelized

    // biases
    Vector b;
    Vector db; // TODO: restructure this so that training can be parallelized

  public:
    // initialize with random weights and biases
    Layer(const size_t in_width, const size_t out_width);
    // initialize by deserializing from the input stream
    Layer(const size_t in_width, const size_t out_width, std::istream &in);

    // a cache Vector optionally stores the result of applying the weights and
    // biases to the input Vector, to be used during backpropagation
    Vector eval(const Vector &in) const;
    Vector eval(const Vector &in, Vector &cache) const;

    // backpropagation
    Vector back(
        const Vector &in,
        const Vector &cache,
        const Vector &delta
    );

    void learn(
        const Scalar weight_decay_factor,
        const Scalar step_size,
        const Scalar momentum_factor
    );

    friend std::istream &operator>>(std::istream &in, Layer &layer);
    friend std::ostream &operator<<(std::ostream &out, const Layer &layer);
};
