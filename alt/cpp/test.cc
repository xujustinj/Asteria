#include <iostream>

#include "linalg.h"

using namespace std;


int main() {
    const Matrix mat{{1.0, 2.0, 3.0}, {4.0, 5.0, 6.0}, {7.0, 8.0, 9.0}};
    cout << mat << endl;
    cout << transpose(mat) << endl;

    const Vector vec{-1.0, -2.0, -3.0};
    cout << vec << endl;
    cout << mat * vec << endl;
    cout << transpose(mat) * vec << endl;
}
