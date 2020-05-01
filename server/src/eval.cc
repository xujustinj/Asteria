#include <iostream>
#include <fstream>
#include <sstream>
#include <string>

#include "mlp/linalg.h"
#include "mlp/neural.h"
#include "mlp/rand.h"

using namespace std;


int main(int argc, char *argv[]) {
    // Arguments:
    string filename{argv[1]};

    // Set up streams for floating point I/O
    const int precision = numeric_limits<Scalar>::max_digits10;
    cin.precision(precision);
    cout.precision(precision);
    cerr.precision(precision);

    MLP mlp{};
    ifstream{filename} >> mlp;

    string s;
    Vector in(mlp.inWidth());
    Vector out(mlp.outWidth());
    while (cin >> in >> out) {
        Vector result = mlp.eval(in);
        Vector err = result - out;
        cout << sqrt(dProd(err, err)) << '\t' << result << endl;
        getline(cin, s);
    }
}

