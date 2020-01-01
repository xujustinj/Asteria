import Differentiable from './core/differentiable';
import Expression from './core/expression';
import Variable from './core/variable';

class BinaryProduct extends Expression {
    left: Differentiable;
    right: Differentiable;

    constructor(left: Differentiable, right: Differentiable) {
        super();
        this.left = left;
        this.right = right;
    }

    protected valueImpl(): number {
        return this.left.value() * this.right.value();
    }

    protected derivImpl(v: Variable): number {
        let dlr = this.left.deriv(v) * this.right.value();
        let ldr = this.left.value() * this.right.deriv(v);
        return dlr + ldr;
    }

    print(): string {
        return this.left.print() + " * " + this.right.print();
    }
}

class Sum extends Expression {
    terms: Differentiable[];

    constructor(...terms: Differentiable[]) {
        super();
        this.terms = terms;
    }

    protected valueImpl(): number {
        return this.terms.reduce((acc, term) => acc + term.value(), 0);
    }

    protected derivImpl(v: Variable): number {
        return this.terms.reduce((acc, term) => acc + term.deriv(v), 0);
    }

    print(): string {
        return "(" + this.terms.map((term) => term.print()).join(" + ") + ")";
    }
}

export { BinaryProduct, Sum };
