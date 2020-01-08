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

In each of the above versions, Asteria is initialized with pseudorandom weights, and with biases set to zero.

## Implementation

Asteria currently learns by gradient descent using derivatives computed by a kind of symbolic differentiation. (If I cared about performance, I wouldn't have used JS in the first place!) Symbolic differentiation is implemented in the `Diffable` module.

The `Neuro` module then introduces neurons, layers, networks as increasingly abstract wrappers around `Diffable`. At the layer level, we train a network by binding an input to the input layer, then differentiating the output layer's error function with respect to each of the weight and bias parameters.

## Need for Speed

Asteria learns really slowly. Part of this learning adventure is to figure out how to make Asteria fast.

### Momentum

The adjustment to each parameter determines its acceleration in the [momentum method](https://en.wikipedia.org/wiki/Stochastic_gradient_descent#Momentum).

### Orthogonal Weight Vectors

Especially with a symmetric activation function, it would be wasteful to have multiple neurons derived from the previous layer with weights that are scalar multiples of one another; those two neurons would be mostly redundant. To avoid this, layers are initialized with pseudorandom initial weights instead.

The best way (I could think of) to avoid redundancy is to have weight vectors that are "as orthogonal as possible". Specifically, we want to minimize their pairwise dot products. I don't know any fast way to compute this, so Asteria uses a heuristic:

If there are n neurons in the previous layer, our first n weight vectors roughly correspond to some rotation of the standard basis in R^n. The next 2^(n-1) weight vectors roughly correspond to the vertices of the upper half of an n-cube.

This seems to be an uncommon technique that occasionally comes up in research (e.g. [Weideman](https://hjweide.github.io/orthogonal-initialization-in-convolutional-layers)), so I'll definitely be doing more testing to see if it is empirically useful. Stay turned for more developments.

