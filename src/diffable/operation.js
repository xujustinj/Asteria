import Expression from './expression.js';

class BinaryProduct extends Expression {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    valueImpl() {
        return this.left.value() * this.right.value();
    }

    derivImpl(name) {
        let dlr = this.left.deriv(name) * this.right.value();
        let ldr = this.left.value() * this.right.deriv(name);
        return dlr + ldr;
    }

    print() {
        return this.left.print() + " * " + this.right.print();
    }
}

class Sum extends Expression {
    constructor(...terms) {
        super();
        this.terms = terms;
    }

    valueImpl() {
        return this.terms.reduce((acc, term) => acc + term.value(), 0);
    }

    derivImpl(name) {
        return this.terms.reduce((acc, term) => acc + term.deriv(name), 0);
    }

    print() {
        return "(" + this.terms.map((term) => term.print()).join(" + ") + ")";
    }
}

export { BinaryProduct, Sum };
