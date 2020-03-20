#include <iostream>
#include <sstream>
#include <string>

#include "linalg.h"
#include "neural.h"
#include "rand.h"

using namespace std;


int main(int argc, char *argv[]) {
    // Arguments:
    int generations;    istringstream{argv[1]} >> generations;
    int trials;         istringstream{argv[2]} >> trials;
    double persistence; istringstream{argv[3]} >> persistence;
    double sensitivity; istringstream{argv[4]} >> sensitivity;
    double momentum;    istringstream{argv[5]} >> momentum;

    // Set up streams for floating point I/O
    const int precision = numeric_limits<Scalar>::max_digits10;
    cin.precision(precision);
    cout.precision(precision);
    cerr.precision(precision);

    MLP mlp{};
    cin >> mlp;

    for (int gen = 1; gen <= generations; ++gen) {
        cerr << "GENERATION " << gen << endl;
        // cerr << mlp;
        Scalar rsq = 0.0;
        for (int i = 0; i < trials; ++i) {
            Vector err = mlp.train({randScalar()}, {42.0});
            rsq += dProd(err, err);
        }
        if (rsq == 0.0) {
            cerr << "Perfection achieved." << endl;
            break;
        } else {
            cerr << "r = " << sqrt(rsq / trials) << endl;
        }
        mlp.learn(persistence, sensitivity / trials, momentum);
    }
    cout << mlp;
}
