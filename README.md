# Asteria

A solo adventure to learn how machines learn.

**Starting Point:** [3Blue1Brown's Neural Networks series](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)

**Current Destination:** a multilayer [multiclass perceptron](https://en.wikipedia.org/wiki/Perceptron#Multiclass_perceptron) that can recognize [Madeon's secret Adventure alphabet](https://madeon.fandom.com/wiki/Adventure_alphabet)

**Ultimate Destination**: some kind of tool that can identify and automatically translate the Adventure alphabet wherever it appears in an image?

## Are we there yet?

With a focus on learning, this project is intended to take the path of greatest resistance: from scratch. I'm taking a hands-on-first approach, looking up further theory only when I get stuck.

A side quest on this adventure is to get used to React and object-oriented programming in JavaScript (TypeScript). The project site currently hosts a collection of intermediate proofs-of-concept that you can train in your own browser.

* **Asteria 42** learns to output the answer to life, the universe, and everything (faster than Deep Thought).

* **Asteria NAND** learns to output `a NAND b`, with a single hidden layer of 2 neurons. In theory, this means that we can learn any Boolean function just by stringing together a bunch of Asteria NANDs. Values greater than 0.5 are treated as true. *Below: A heat map of Asteria NAND's near-perfect output in the range [0,1]x[0,1]. Green indicates points (a,b) mapped to true, and red indicates pairs mapped to false. Asteria reached this point after 10000 generations.*

![A heat map of Asteria NAND's output in the range [0,1]x[0,1]](img/NAND-solution.png "A heat map of Asteria NAND's output in the range [0,1]x[0,1]")

* **Asteria XOR** is a bunch of strung-together Asteria NANDs (3 hidden layers of 2, 4, and 4 neurons respectively). Asteria XOR learns to output `a XOR b` (but the time it takes to do so on most browsers is in the tens of minutes).

In each of the above versions, Asteria is initialised with pseudorandom weights, and with biases set to zero.

## Implementation

Asteria runs completely within the browser and is trained on the client's machine. Doubly limited by both the questionable performance of JavaScript and the synchronous processing power of a single computer, part of the challenge is to get Asteria to learn as efficiently as possible.

Originally, Asteria used symbolic differentiation whose implementation can still be seen in the deprecated `src/deprecated/diffable` and `src/deprecated/neuro`  modules. After Asteria XOR failed to train (at any reasonable speed) using symbolic differentiation, I overhauled its structure in favour of the mathematically equivalent but computationally faster method of matrix multiplication.

## Need for Speed

Asteria learns really slowly. Part of this learning adventure is to figure out how to make Asteria fast.

### Momentum

The adjustment to each parameter determines its acceleration in the [momentum method](https://en.wikipedia.org/wiki/Stochastic_gradient_descent#Momentum).

### Orthogonal Weight Vectors

Especially with a symmetric activation function, it would be wasteful to have multiple neurons derived from the previous layer with weights that are scalar multiples of one another; those two neurons would be mostly redundant. To avoid this, layers are initialised with pseudorandom initial weights instead.

The best way (I could think of) to avoid redundancy is to have weight vectors that are "as orthogonal as possible". Specifically, we want to minimise their pairwise dot products. I don't know any fast way to compute this, so Asteria uses a heuristic:

If there are n neurons in the previous layer, each group of n weight vectors correspond to some random rotation of the standard basis in R^n. Each group is rotated randomly, so there is still a chance that multiple vectors are near-parallel by simple coincidence. Nonetheless, in most cases in Asteria, a single group is sufficient.

This seems to be an uncommon technique that occasionally comes up in research (e.g. [Weideman](https://hjweide.github.io/orthogonal-initialization-in-convolutional-layers)), so I'll definitely be doing more testing to see if it is empirically useful. Stay turned for more developments.
