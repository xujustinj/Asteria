#include <limits>
#include <iostream>

#include "linalg.h"
#include "neural.h"
#include "rand.h"

using namespace std;


int main() {
    int precision = std::numeric_limits<double>::max_digits10;
    cin.precision(precision);
    cout.precision(precision);
    cerr.precision(precision);

    MLP mlp{};
    cin >> mlp;
    cerr << "Initialized the following network:" << endl << mlp;

    int gen = 0;
    const int max = 100000;
    const int trains = 64;
    while (++gen <= max) {
        double rsq = 0.0;
        for (int i = 0; i < trains; ++i) {
            Vector err = mlp.train({randScalar()}, {42.0});
            rsq += dProd(err, err);
        }
        if (rsq == 0.0) {
            cerr << "Error reached 0 after " << gen << " generations." << endl;
            break;
        }
        mlp.learn(0.2 / trains, 0.2);
        // cerr << mlp;
    }
    cout << mlp;
}
