import Differentiable from './core/differentiable'
import Expression from './core/expression';
import Variable from './core/variable';

class Logistic extends Expression {
    arg: Differentiable;

    constructor(arg: Differentiable) {
        super();
        this.arg = arg;
    }

    protected valueImpl(): number {
        let x = this.arg.value();
        let y = 1 / (1 + Math.exp(-x));
        return isFinite(y) ? y : ((x < 0) ? 0 : 1);
    }

    protected derivImpl(v: Variable): number {
        let val = this.arg.value();
        let d = this.arg.deriv(v) / (Math.exp(val) + 2 + Math.exp(-val));
        return isFinite(d) ? d : 0;
    }

    print(): string {
        return "σ(" + this.arg.print() + ")";
    }
}

class Softplus extends Expression {
    arg: Differentiable;

    constructor(arg: Differentiable) {
        super();
        this.arg = arg;
    }

    protected valueImpl(): number {
        let x = this.arg.value();
        let y = 1 + Math.exp(x);
        return isFinite(y) ? Math.log(y) : x;
    }

    protected derivImpl(v: Variable): number {
        let x = this.arg.value();
        let df = 1 / (1 + Math.exp(-x));
        df = isFinite(df) ? df : 0;
        return df * this.arg.deriv(v);
    }

    print(): string {
        return "ReLU(" + this.arg.print() + ")";
    }
}

export { Logistic, Softplus };
