# Asteria

Asteria is an adventure to build AI from scratch. Ultimately, the goal is to have a live translator for [Madeon's secret Adventure alphabet](https://madeon.fandom.com/wiki/Imperial_alphabet). Like any good adventure, the value is really in the friends and side quests on the way, as long as the project maintains its single guiding principle:

> "Avoid existing libraries wherever possible."

## Roadmap

### So Far

- [`linalg`](https://github.com/xujustinj/Asteria1/tree/main/engine/linalg), a module that tries its best at vectorized linear algebra
- [`neural`](https://github.com/xujustinj/Asteria1/tree/main/engine/neural), a module that defines fully-connected feedforward multilayer perceptrons, including:
  - branchless implementations of common activation functions that are safe with floating point
  - (experimental) orthogonal weight vector initialization
  - momentum, L2 regularization
- a [command line engine](https://github.com/xujustinj/Asteria1/blob/main/engine/train.cc) to initialize and train arbitrarily networks
- a [script](https://github.com/xujustinj/Asteria1/blob/main/sampler.py) to convert classified images of handwritten characters into `.tsv` data that can be read by the engine

### Up Next

- a dataset
- a website to demonstrate trained models
- convolutional neural networks
- parallelism
