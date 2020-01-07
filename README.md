# Asteria

A solo adventure to learn how machines learn.

**Starting Point:** [3Blue1Brown's Neural Networks series](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)

**Current Destination:** a multilayer [multiclass perceptron](https://en.wikipedia.org/wiki/Perceptron#Multiclass_perceptron) that can recognize [Madeon's secret Adventure alphabet](https://madeon.fandom.com/wiki/Adventure_alphabet)

**Ultimate Destination**: some kind of tool that can identify and automatically translate the Adventure alphabet wherever it appears in an image?

## Are we there yet?

With a focus on learning, this project is intended to take the path of greatest resistance: from scratch. I'm taking a hands-on-first approach, looking up further theory only when I get stuck.

A side quest on this adventure is to get used to React and object-oriented programming in JavaScript (TypeScript). The project site currently hosts a collection of intermediate proofs-of-concept that you can train in your own browser.

* **Asteria 42** learns to output the answer to life, the universe, and everything (faster than Deep Thought).
* **Asteria NAND** learns to output `a NAND b`. In theory, this means that we can learn any Boolean function just by stringing together a bunch of Asteria NANDs.
* **Asteria XOR** is a bunch of strung-together Asteria NANDs. Whether it actually learns to output `a XOR b`  is yet to be seen.

## Implementation

Asteria currently learns by gradient descent using derivatives computed by a kind of symbolic differentiation. (If I cared about performance, I wouldn't have used JS in the first place!) Symbolic differentiation is implemented in the `Diffable` module.

The `Neuro` module then introduces neurons, layers, networks as increasingly abstract wrappers around `Diffable`. At the layer level, we train a network by binding an input to the input layer, then differentiating the output layer's error function with respect to each of the weight and bias parameters.

The adjustment to each parameter determines its acceleration in the [momentum method](https://en.wikipedia.org/wiki/Stochastic_gradient_descent#Momentum).