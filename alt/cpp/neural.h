#ifndef NEURAL_H
#define NEURAL_H

#include <cstddef>
#include <istream>
#include <ostream>
#include <vector>

#include "linalg.h"


// activation function (softplus ReLU)
// Scalar Act(Scalar x);
Vector Act(const Vector &vec);
// Scalar dAct(Scalar x);
Vector dAct(const Vector &vec);


class Layer {
  public:
    const size_t inWidth;
    const size_t outWidth;

  private:
    Matrix w;
    Matrix dw;

    Vector b;
    Vector db;

  public:
    Layer(size_t inWidth, size_t outWidth);

    Vector eval(const Vector &in) const;
    Vector eval(const Vector &in, Vector &cache) const;
    Vector back(const Vector &in, const Vector &cache, const Vector &delta);
    void learn(double persistence, double sensitivity, double momentum);

    friend std::istream &operator>>(std::istream &in, Layer &layer);
    friend std::ostream &operator<<(std::ostream &out, const Layer &layer);
};


class MLP { // stands for Multi-Layer Perceptron
  private:
    std::vector<Layer> layers;

  public:
    MLP(); // empty - must be initialized through other means
    // MLP(std::initializer_list<size_t> widths);

    Vector eval(const Vector &in) const;
    Vector train(const Vector &in, const Vector &out);
    void learn(double persistence, double sensitivity, double momentum);

    friend std::istream &operator>>(std::istream &in, MLP &mlp);
    friend std::ostream &operator<<(std::ostream &out, const MLP &mlp);
};


#endif
