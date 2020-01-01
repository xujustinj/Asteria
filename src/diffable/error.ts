import Differentiable from './core/differentiable';
import Expression from './core/expression';
import Variable from './core/variable';

class SquaredError extends Expression {
    actual: Differentiable;
    expect: Differentiable;

    constructor(actual: Differentiable, expect: Differentiable) {
        super();
        this.actual = actual;
        this.expect = expect;
    }

    protected valueImpl(): number {
        let diff = this.actual.value() - this.expect.value();
        return diff * diff;
    }

    protected derivImpl(v: Variable): number {
        let diff = this.actual.value() - this.expect.value();
        return 2 * diff * (this.actual.deriv(v) - this.expect.deriv(v));
    }

    print(): string {
        return "(" + this.actual.print() + " - " + this.expect.value() + ")^2";
    }
}

export { SquaredError };
