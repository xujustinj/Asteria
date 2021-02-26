#ifndef BASE_TEST_H
#define BASE_TEST_H

#include <functional>

namespace Testing {
    void time(const std::string &name, const std::function<void()> &lambda);
}

#endif
