#pragma once

#include <memory>
#include <utility>
#include <vector>

#include "linalg/core.h"


using Sample = std::pair<const Vector, const Vector>;

class Sampler {
  private:
    std::vector<std::unique_ptr<const Sample>> samples = {};

  public:
    // Registers the given sample in the interal list. Invalidates any existing
    // batches.
    void add(const Vector &in, const Vector &out);

    size_t size();

    // Returns k distinct randomly-chosen samples out of the n registered
    // samples. Sampling is without-replacement because that has been shown to
    // yield faster results than with-replacement, according to the following
    // source https://arxiv.org/pdf/1202.4184v1.pdf.
    // requires: k <= count()
    const std::vector<const Sample*> random_batch(const size_t k);

    // TODO: implement a helper that returns an epoch composed of smaller
    // batches; each batch is an iterable view into the vector
    // const std::vector<...> random_epoch(const size_t k);
};
