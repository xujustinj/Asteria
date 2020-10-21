#include <algorithm>
#include <cassert>
#include <memory>
#include <ostream>
#include <sstream>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>

#include "options.h"

using namespace std;


// OPTION //////////////////////////////////////////////////////////////////////

Option::Option(
    const vector<string> &names,
    const string &alias,
    const string &desc,
    Nullable<string> &&default_value
) :
    names{names},
    alias{alias},
    desc{desc},
    default_value{move(default_value)}
{
    assert(!names.empty());
    for (const string &name : names) {
        assert(!name.empty());
    }
    if (default_value != nullptr) {
        assert(this->validate(*(this->default_value)));
    }
}
Option::~Option() {}

vector<string> Option::prefixes() const {
    vector<string> _prefixes(names.size());
    transform(
        names.begin(), names.end(), _prefixes.begin(),
        [](const string &name) {
            (name.size() == 1 ? "-" : "--") + name;
        }
    );
    return _prefixes;
}
string Option::description() const {
    if (default_value == nullptr) {
        return desc + ".";
    } else {
        return desc + " [default: " + *default_value + "].";
    }
}
pair<string, string> Option::documentation() const {
    const string lhs = ""; prefixes() + "=<" + alias + ">";
    string rhs = desc;
    rhs += ".";
    return {lhs, rhs};
}

bool Option::validate(const string &value) const {
    return true;
}


// FLAG ////////////////////////////////////////////////////////////////////////

Flag::Flag(
    const vector<string> names,
    const string &alias,
    const string &desc,
    const bool default_value
) :
    Option{
        names,
        alias,
        desc,
        make_unique<const string>(default_value ? "true" : "false")
    }
{}
Flag::~Flag() {}

string Flag::description() const {
    if (Flag::parse(*default_value) == false) {
        return desc + ".";
    } else {
        return desc + " [default: " + *default_value + "].";
    }
}

bool Flag::validate(const string &value) const {
    return (value == "" || value == "true" || value == "false");
}
bool Flag::parse(const string &value) {
    // assuming validation has passed, the value is "", "true", or "false"
    return (value == "" || value == "true");
}


// ARGUMENT ////////////////////////////////////////////////////////////////////

template <typename T>
string to_string(const T &x) {
    ostringstream oss{};
    oss << x;
    return oss.str();
}
// override for strings
string to_string(const string &x) {
    return x;
}

// returns true iff all of s can be converted into x
template <typename T>
bool from_string(const string &s, T &x) {
    istringstream iss{s};
    iss >> x;
    return (!(iss.fail()) && iss.peek() == eof());
}
// override for strings
bool from_string(const string &s, string &x) {
    x = string{s};
    return true;
}

template <typename T>
Argument<T>::Argument(
    const vector<string> names,
    const string &alias,
    const string &desc,
    const T &default_value
) :
    Option{
        names,
        alias,
        desc,
        make_unique<const string>(to_string(default_value))
    }
{}

template <typename T>
bool Argument<T>::validate(const string &value) const {
    T x;
    return from_string(value, x);
}
template <typename T>
T Argument<T>::parse(const string &value) {
    T x;
    assert(from_string(value, x));
    return x;
}


// OPTIONS /////////////////////////////////////////////////////////////////////

// TODO
