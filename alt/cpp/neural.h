#ifndef NEURAL_H
#define NEURAL_H

#include <cstddef>
#include <ostream>
#include <vector>

#include "linalg.h"


class Layer {
    size_t inWidth;
    size_t outWidth;

    Matrix w;
    Matrix dw;

    Vector b;
    Vector db;

  public:
    Layer(size_t inWidth, size_t outWidth);

    Vector eval(const Vector &in) const;
    Vector eval(const Vector &in, Vector &cache) const;
    Vector back(const Vector &in, const Vector &cache, const Vector &delta);
    void learn(double sensitivity, double momentum);

    friend std::ostream &operator<<(std::ostream &out, const Layer &layer);
};


class MLP { // stands for Multi-Layer Perceptron
  private:
    std::vector<Layer> layers;

  public:
    MLP(std::initializer_list<size_t> widths);

    Vector eval(const Vector &in) const;
    void train(const Vector &in, const Vector &out);
    void learn(double sensitivity, double momentum);

    friend std::ostream &operator<<(std::ostream &out, const MLP &mlp);
};


#endif
