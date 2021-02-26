#include <cassert>

#include "base_test.h"

// #include "../linalg.h"

void random_test() {
    int y = 0;
    for (int x = 0; x < 600000; ++x) {
        y += x;
    }
    assert(1 + 6 == 8);
}

int main() {
    Testing::time("Hi", random_test);
}
