#pragma once

#include <memory>
#include <ostream>
#include <string>
#include <unordered_map>
#include <utility>
#include <vector>


template <typename T>
using Nullable = std::unique_ptr<const T>;

struct Option {
    const std::vector<std::string> names;
    const std::string alias;
    const std::string desc;
    const Nullable<std::string> default_value; // option is required if null

    Option(
        const std::vector<std::string> &names,
        const std::string &alias,
        const std::string &desc,
        Nullable<std::string> &&default_value
    );
    virtual ~Option() = 0;

    virtual std::vector<std::string> prefixes() const;
    virtual std::string description() const;
    virtual std::pair<std::string, std::string> documentation() const;

    // Whether parsing as the given Type will succeed.
    virtual bool validate(const std::string &value) const;
};

// A Flag is true iff empty or "true", false iff "false", and invalid
// otherwise.
struct Flag : public Option {
    Flag(
        const std::vector<std::string> names,
        const std::string &alias,
        const std::string &desc,
        const bool default_value = false
    );
    virtual ~Flag();

    virtual std::string description() const override;

    virtual bool validate(const std::string &value) const override;
    static bool parse(const std::string &value);
};

template <typename T>
struct Argument : public Option {
    Argument(
        const std::vector<std::string> names,
        const std::string &alias,
        const std::string &desc,
        const T &default_value
    );
    virtual ~Argument();

    virtual bool validate(const std::string &value) const override;
    static T parse(const std::string &value);
};


class Options {
  private:
    const std::vector<std::unique_ptr<const Option>> options;
    std::unordered_map<const Option*, Nullable<std::string>> values;

  public:
    Options(const std::vector<Option> &options);

    bool get_flag(const std::string &name) const;
    template <typename T> T get(const std::string &name) const;

    // Print usage
    friend std::ostream &operator<<(std::ostream &out, const Options &options);

    bool parse(int argc, char *argv[]);
};
