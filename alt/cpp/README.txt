Run `g++ -Ofast *.cc -o engine` in this directory to compile the engine.

ARGUMENTS
generations - maximum number of generations to train
trials      - number of training data samples per generations
persistence - weights are multiplied by this amount between generations
sensitivity - size of step taken with respect to the training
momentum    - amount of previous step used in next generation

INPUT
.mlp file

OUTPUT
.mlp file

What is .mlp?
MLP stands for Multi-Layer Perceptron. A .mlp file fully describes an MLP:
  - The first line is a series of whitespace-delimited integers representing the
    widths of the MLP's layers. The first integer corresponds to the width of
    the input layer, and the last integer corresponds to the width of the output
    layer.
    EXAMPLE: 2 4 5 3 describes a network with 2 input neurons, 4 neurons in the
    first hidden layer, 5 neurons in the second hidden layer, and 3 output
    neurons.
  - A series of whitespace-delimited lines specifying each layer other than the
    input layer:
    w_11    w_12    ...     w_1n        b_1
    w_21    w_22    ...     w_2n        b_2
    .       .       .       .           .
    .       .        .      .           .
    .       .         .     .           .
    w_m1    w_m2    ...     w_mn        b_m
    Where w_ij is the weight of neuron j of the previous layer in neuron i of
    this layer, and b_i is the bias.
    Layers are obviously given in order. The program doesn't check to make sure
    that given layers have the right dimensions. Be careful!
