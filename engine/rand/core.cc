#include <random>

#include "core.h"

using namespace std;


default_random_engine gen{};

uniform_real_distribution<double> uniform_distribution(0, 1.0);
double uniform() {
    return uniform_distribution(gen);
}

uniform_real_distribution<double> uniform_distribution_pm(-1.0, 1.0);
double uniform_pm() {
    return uniform_distribution_pm(gen);
}

size_t uniform_idx(const size_t max) {
    return uniform_int_distribution<size_t>(0, max)(gen);
}
