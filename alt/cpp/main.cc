#include <iostream>
#include <fstream>
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
    string filename{argv[6]};

    // Set up streams for floating point I/O
    const int precision = numeric_limits<Scalar>::max_digits10;
    cin.precision(precision);
    cout.precision(precision);
    cerr.precision(precision);

    MLP mlp{};
    ifstream{filename} >> mlp;
    {
        Vector in(mlp.inWidth());
        Vector out(mlp.outWidth());
        while (cin >> in >> out) {
            registerSample(in, out);
        }
    }

    for (int gen = 1; gen <= generations; ++gen) {
        Scalar rsq = 0.0;
        for (int i = 0; i < trials; ++i) {
            const pair<Vector, Vector> sample = randSample();
            Vector err = mlp.train(sample.first, sample.second);
            rsq += dProd(err, err);
        }
        if (rsq == 0.0) {
            cerr << gen << "\tPerfection achieved." << endl;
            break;
        } else {
            cerr << gen << "\tlog(r) = " << log(rsq / trials) / 2 << endl;
        }
        // cerr << mlp;
        mlp.learn(persistence, sensitivity / trials, momentum);
    }
    cout << mlp;
}
