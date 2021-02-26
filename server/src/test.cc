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
    double threshold; istringstream{argv[1]} >> threshold;
    string filename{argv[2]};

    // Set up streams for floating point I/O
    const int precision = numeric_limits<Scalar>::max_digits10;
    cin.precision(precision);
    cout.precision(precision);
    cerr.precision(precision);

    MLP mlp{};
    ifstream{filename} >> mlp;

    string s;
    Vector in(mlp.inWidth());
    Vector expect(mlp.outWidth());
    while (cin >> in >> expect) {
        Vector out = mlp.eval(in);
        Vector err = out - expect;
        const double r = sqrt(dProd(err, err));
        if (r >= threshold) {
            cout << "-------------------------------------------------------------------------------" << endl;
            cout << "Bad sample found (r = " << r << ')' << endl;
            cout << "    in:\t" << in << endl;
            cout << "expect:\t" << expect << endl;
            cout << "   out:\t" << out << endl;
        }
        getline(cin, s);
    }
}
