# Asteria1

Asteria is my side quest to identify and translate text in live videos. To make it more interesting, I'm building as much as I can **from scratch**, and I'm avoiding existing tutorials and courses on machine learning. I've really enjoyed the intuition for performance and machine learning that this project has taught me so far.

Scope creep on the original [Asteria](https://github.com/xujustinj/Asteria) repository motivated me to split it into snapshots with better-defined scopes. This is the first snapshot of many.

## Features

In this snapshot:

1. [`linalg`](https://github.com/xujustinj/Asteria1/tree/main/engine/linalg), a C++ library that does a bunch of linear algebra with `std::valarray` vectors.
2. [`neural`](https://github.com/xujustinj/Asteria1/tree/main/engine/neural), a C++ library that defines fully-connected feedforward multilayer perceptrons. Features include:
   1. Branchless implementations of common activation functions (which avoid floating point overflow) including: softplus, ELU, standard logistic sigmoid.
   2. Orthogonal weight vector initialization, and a custom version of Xavier initialization made to be compatible with orthogonal weights. (I came up with this one day and figured it would help make networks train faster. Some [research](https://hjweide.github.io/orthogonal-initialization-in-convolutional-layers) agrees with my hunch but I have yet to see its benefits for myself.)
   3. Step size, momentum, weight decay.
3. A [command line engine](https://github.com/xujustinj/Asteria1/blob/main/engine/train.cc) using `neural` to initialize and train arbitrarily networks.
   1. In performance tests with a single thread on my laptop, the engine trained multiple layers of hundreds of neurons at a pretty good pace.
4. A [script](https://github.com/xujustinj/Asteria1/blob/main/sampler.py) to convert classified images of handwritten characters into `.tsv` data that can be ingested by the engine.
5. [**IN PROGRESS**] [Training data](https://github.com/xujustinj/Asteria1/tree/main/data/imperial_alphabet) (not MNIST) for the [target language's alphabet](https://madeon.fandom.com/wiki/Imperial_alphabet) to use in the engine.
6. [**TODO**] A simple website to showcase the resulting model by running it in the browser. (A [TypeScript training engine](https://github.com/xujustinj/Asteria/tree/master/client/src/neural) from the original Asteria project will be repurposed for this.)

## What's Next for Asteria2

* Convolutional neural networks
* Parallelism

