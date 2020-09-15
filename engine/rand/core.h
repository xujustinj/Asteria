#pragma once


double uniform(); // uniform [0, 1)

double uniform_pm(); // uniform [-1, 1)

// returns a random index from a list of n elements
size_t uniform_idx(size_t n); // discrete uniform [0, n)
