#include <iostream>
#include <fstream>
#include <limits>
#include <list>
#include <memory>
#include <sstream>
#include <string>
#include <vector>

#include "linalg/core.h"
#include "linalg/io.h"
#include "linalg/rand.h"
#include "neural/except.h"
#include "neural/mlp.h"
#include "rand/sampling.h"

using namespace std;


// Follows the http://docopt.org/ standard.
int usage(const string &argv0, int code = 0) {
    cerr <<
    "Asteria's first training engine." << endl
    << endl
    << "Usage:" << endl
    << "  " << argv0 << " [options] (--start <file> | --hidden <widths>) [--] <file> ..." << endl
    << endl
    << "Options:" << endl
    << "  " << "-e <n>, --epochs <n>    Epochs to train [default: 1]" << endl
    << "  " << "-b <n>, --batch <n>     Batch size [default: size of training set]" << endl
    << "  " << "-d <x>, --decay <x>     Weight decay factor [default: 0.0]" << endl
    << "  " << "-m <x>, --momentum <x>  Momentum factor [default: 0.0]" << endl
    << "  " << "-s <x>, --step <x>      Step size [default: 1.0]" << endl
    << "  " << "--start <file>          Load a model from file." << endl
    << "  " << "--hidden <widths>       Construct a new model with the given layers." << endl;
    exit(code);
}


int main(int argc, char *argv[]) {
    // TODO: this is a misnomer at the moment, due to the non-standard way
    // batching is done in rand/sampling. Fix this by resolving the TODO in
    // rand/sampling.
    size_t epochs = 1;

    /**
     * The number of samples used for training between each step.
     */
    size_t batch_size = numeric_limits<size_t>::max();

    /**
     * The factor by which all weights are scaled towards 0 before each step. It
     * is a pretty well-known result that weight decay is equivalent to L2
     * regularization, which combats overfitting.
     *
     * Values close to 1 will cause the model to vanish to nothingness.
     */
    Scalar weight_decay_factor = 0.0;

    /**
     * The proportion of the previous step that is repeated in the current step.
     * That amount also carries through into the next step, and so on.
     *
     * In practice, a greater momentum warrants a lower step size, because steps
     * apply multiple times.
     */
    Scalar momentum_factor = 0.0;

    /**
     * A constant multiplier on the step computed by backpropagation, before it
     * is applied.
     *
     * Larger step sizes can reduce the number of training epochs needed, at the
     * cost of accuracy. Thus, the step size is also called "learning rate".
     */
    Scalar step_size = 1.0;

    unique_ptr<MultiLayerPerceptron> mlp = nullptr;

    // initial 0 to be later overwritten by the determined input width
    size_t input_width = 0;
    size_t output_width = 0;
    vector<size_t> layer_widths = {0};

    Sampler sampler{};

    // Parse options
    int i = 1;
    for (; i < argc; ++i) {
        const string arg = argv[i];
        if (arg == "--") {
            break;
        } else if (arg == "-e" || arg == "--epochs") {
            size_t n;
            if (++i < argc && istringstream(argv[i]) >> n) {
                epochs = n;
                continue;
            }
            return usage(argv[0]);
        } else if (arg == "-b" || arg == "--batch") {
            size_t n;
            if (++i < argc && istringstream(argv[i]) >> n) {
                batch_size = n;
                continue;
            }
            usage(argv[0]);
        } else if (arg == "-d" || arg == "--decay") {
            Scalar x;
            if (++i < argc && istringstream(argv[i]) >> x) {
                weight_decay_factor = x;
                continue;
            }
            usage(argv[0]);
        } else if (arg == "-m" || arg == "--momentum") {
            Scalar x;
            if (++i < argc && istringstream(argv[i]) >> x) {
                momentum_factor = x;
                continue;
            }
            usage(argv[0]);
        } else if (arg == "-s" || arg == "--step") {
            Scalar x;
            if (++i < argc && istringstream(argv[i]) >> x) {
                step_size = x;
                continue;
            }
            usage(argv[0]);
        } else if (arg == "--start") {
            if (++i < argc) {
                ifstream ifs(argv[i]);
                if (ifs) {
                    try {
                        mlp = make_unique<MultiLayerPerceptron>(ifs);
                        continue;
                    } catch (const neural_exception &e) {
                        cerr << e.what() << endl;
                        return 1;
                    }
                }
            }
            usage(argv[0]);
        } else if (arg == "--hidden") {
            if (++i < argc) {
                size_t n;
                istringstream iss(argv[i]);
                while (iss >> n) {
                    layer_widths.emplace_back(n);
                }
                continue;
            }
            usage(argv[0]);
        } else {
            break;
        }
    }
    // TODO: actually parse the .tsv headers
    // TODO: validate that input/output width
    for (; i < argc; ++i) {
        string s;
        ifstream ifs(argv[i]);
        if (getline(ifs, s)) {
            istringstream iss{s};
            string name;
            while (iss >> name) {
                switch (name[0]) {
                    case 'I': {
                        ++input_width;
                        break;
                    }
                    case 'O': {
                        ++output_width;
                        break;
                    }
                    default: {
                        cerr << argv[i] << " contains invalid names" << endl;
                        return 1;
                    }
                }
            }
        }

        Vector in(input_width);
        Vector out(output_width);
        while (ifs >> in >> out) {
            // cerr << "In: " << in << "\tOut: " << out << endl;
            sampler.add(in, out);
        }
    }
    layer_widths[0] = input_width;
    layer_widths.emplace_back(output_width);

    if (batch_size > sampler.size()) {
        batch_size = sampler.size();
    }

    if (mlp == nullptr) {
        mlp = make_unique<MultiLayerPerceptron>(layer_widths);
    }
    // cerr << "Initial network:" << endl << *mlp << endl;

    for (size_t epoch = 1; epoch <= epochs; ++epoch) {
        cerr << "Epoch " << epoch << "/" << epochs << "\t";
        Scalar rsq = 0.0;
        vector<const Sample*> batch = sampler.random_batch(batch_size);
        for (const Sample* sample : batch) {
            // cerr << "In: " << sample->first << "\tOut: " << sample->second << endl;
            Vector err = mlp->train(sample->first, sample->second);
            rsq += norm(err);
        }
        if (rsq == 0.0) {
            cerr << "Perfection achieved." << endl;
            break;
        } else {
            cerr << "mean squared training loss = " << rsq / batch.size() << endl;
        }
        mlp->learn(weight_decay_factor, step_size / batch.size(), momentum_factor);
    }

    // set up the I/O streams to have the maximum precision
    const int precision = numeric_limits<Scalar>::max_digits10;
    cout.precision(precision);
    cout << *mlp;
}
