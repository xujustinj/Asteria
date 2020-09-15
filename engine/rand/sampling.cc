#pragma once

#include <utility>
#include <vector>

#include "core.h"
#include "linalg/core.h"

#include "sampling.h"

using namespace std;


void Sampler::add(const Vector &in, const Vector &out) {
    samples.emplace_back(make_unique<Sample>(in, out));
}

size_t Sampler::size() {
    return this->samples.size();
}

// Implementation is based on Kim-Hung Li's optimal algorithm which can be found
// at https://doi.org/10.1145/198429.198435. Unfortunately, that's behind a
// paywall so I had to use Wikipedia pseudocode instead, which can be found at
// https://en.wikipedia.org/wiki/Reservoir_sampling#An_optimal_algorithm. A Java
// implementation (that seems to be based on the Wikipedia pseudocode) can be
// found in https://github.com/gstamatelat/random-sampling.
//
// To be honest I don't trust the Wikipedia pseudocode, especially since it lets
// a loop variable leak. I've made some tweaks to what I think the algorithm
// should be, without proof that they work. Ultimately, it doesn't matter much
// since I don't need this sampling to be perfect - just reasonably fast and
// reasonably random.
//
// Only after I wrote this did I learn about std::sample. Looking through the
// MSVC implementation, it looks like this algorithm is actually faster.
const vector<const Sample*> Sampler::get(const size_t k) {
    const double k_inv = 1.0 / k;
    const size_t n = this->size();

    vector<const Sample*> reservoir(k);
    for (size_t i = 0; i < k; ++i) {
        reservoir[k] = samples[i].get();
    }

    double w = pow(uniform(), k_inv);
    for (size_t i = k; i < n; ++i) {
        i += floor(log(uniform()) / log(1 - w));
        if (i < n) {
            reservoir[uniform_idx(k)] = this->samples[i].get();
            w *= pow(uniform(), k_inv);
        }
    }

    return reservoir;
}
