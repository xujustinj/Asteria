#pragma once

#include <memory>
#include <utility>
#include <vector>

#include "linalg/core.h"


using Sample = std::pair<const Vector, const Vector>;

class Sampler {
  private:
    std::vector<std::unique_ptr<Sample>> samples = {};

  public:
    // Registers the given sample in the interal list
    void add(const Vector &in, const Vector &out);

    size_t size();

    // Returns k distinct randomly-chosen samples out of the n registered
    // requires: k <= count()
    const std::vector<const Sample*> get(const size_t k);
};
