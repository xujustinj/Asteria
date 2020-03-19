#include <iostream>

#include "linalg.h"
#include "neural.h"
#include "rand.h"

using namespace std;


int main() {
    MLP mlp{1, 1};
    cout << mlp << endl;
    for (int gen = 0; gen < 50; ++gen) {
        for (int i = 0; i < 64; ++i) {
            mlp.train({randScalar()}, {42.0});
        }
        mlp.learn(1.0/64, 0.5);
        cout << mlp.eval({-1.0}) << '\t' << mlp.eval({0.0}) << '\t' << mlp.eval({1.0}) << endl;
    }
    cout << mlp << endl;
}
