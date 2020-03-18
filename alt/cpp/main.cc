#include <fstream>
#include <iostream>
#include <sstream>
#include <string>

using namespace std;


int main(int argc, char *argv[]) {
    string filename = "";
    for (int i = 1; i < argc; ++i) {
        char *s = argv[i];
        if (s[0] == '-') {

        } else if (filename.empty()) {
            filename = s;
        } else {
            cerr << "Asteria can only process one MLP file at a time" << endl;
            return 0;
        }
    }

    if (filename.empty()) {
        cerr << "No MLP file given." << endl;
        return 0;
    }

    ifstream ifs{filename};
    if (ifs.fail()) {
        cerr << "Couldn't open file " << filename << endl;
        return 0;
    }

    // TODO
}
