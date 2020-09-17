#include <exception>
#include <string>


// The catch-all exception for the neural module.
class neural_exception : public std::exception {
  private:
    const std::string message;

  public:
    neural_exception(const std::string &message) : message{message} {}

    virtual const char *what() const override {
        return &(message[0]);
    }
};
