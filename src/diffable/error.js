import Expression from './expression.js';

class SquaredError extends Expression {
    constructor(actual, expect) {
        super();
        this.actual = actual;
        this.expect = expect;
    }

    valueImpl() {
        let diff = this.actual.value() - this.expect.value();
        return diff * diff;
    }

    derivImpl(name) {
        let diff = this.actual.value() - this.expect.value();
        return 2 * diff * (this.actual.deriv(name) - this.expect.deriv(name));
    }

    print() {
        return "(" + this.actual.print() + " - " + this.expect.value() + ")^2";
    }
}

export { SquaredError };
