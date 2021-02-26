#include "base_test.h"

#include <chrono>
#include <iostream>
#include <string>
#include <functional>

void Testing::time(const std::string &name, const std::function<void()> &lambda) {
    std::chrono::steady_clock::time_point begin = std::chrono::steady_clock::now();
    lambda();
    std::chrono::steady_clock::time_point end = std::chrono::steady_clock::now();
    const int microseconds = std::chrono::duration_cast<std::chrono::microseconds>(end - begin).count();
    std::cout << name << "\t" << microseconds / 1000.0 << " ms" << std::endl;
}
