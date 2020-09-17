#pragma once

#include <istream>
#include <ostream>
#include <vector>

#include "layer.h"
#include "linalg/core.h"


// TODO: add input/output bindings (labels for the input and output neurons)
class MultiLayerPerceptron {
  private:
    std::vector<Layer> layers;

  public:
    // initialize with random weights and biases
    MultiLayerPerceptron(const std::vector<size_t> &widths);
    // initialize by deserializing from the input stream
    MultiLayerPerceptron(std::istream &in);

    size_t in_width() const;
    size_t out_width() const;

    Vector eval(const Vector &in) const;

    Vector train(const Vector &in, const Vector &out);

    void learn(
        const Scalar weight_decay_factor,
        const Scalar step_size,
        const Scalar momentum_factor
    );

    friend std::istream &operator>>(std::istream &in, MultiLayerPerceptron &mlp);
    friend std::ostream &operator<<(std::ostream &out, const MultiLayerPerceptron &mlp);
};
