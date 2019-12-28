import { Differentiable } from './expression.js';

class Variable extends Differentiable {
    constructor(name, val) {
        super();
        this.name = name;
        this.val = val;
    }

    bind(val) { this.val = val; }

    value() { return this.val; }
    deriv(name) { return (name === this.name) ? 1 : 0; }

    print() { return this.name; }
}

export { Variable };
