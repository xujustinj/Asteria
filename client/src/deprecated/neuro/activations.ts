import { Differentiable, ExprUnary, Variable } from "../diffable";

// Vanishing gradient countermeasures
function positive(x: number): number {
    return (isFinite(x) && x > 0) ? x : Number.MIN_VALUE;
}
function product(x: number, y: number): number {
    const xy = x * y;
    return (xy === 0) ? (Math.sign(x) * Math.sign(y) * Number.MIN_VALUE) : xy;
}

class ActivationLogistic extends ExprUnary {
    protected valueImpl(): number {
        return positive(1 / (1 + Math.exp(-this.arg.value())));
    }

    protected derivImpl(v: Variable): number {
        const val = this.arg.value();
        const d = positive(1 / (Math.exp(val) + 2 + Math.exp(-val)));
        return product(this.arg.deriv(v), d);
    }

    // print(): string {
    //     return "σ(" + this.arg.print() + ")";
    // }
}

class ActivationSoftplus extends ExprUnary {
    protected valueImpl(): number {
        const x = this.arg.value();
        const y = 1 + Math.exp(x);
        return isFinite(y) ? positive(Math.log(y)) : x;
    }

    protected derivImpl(v: Variable): number {
        const d = positive(1 / (1 + Math.exp(-this.arg.value())));
        return product(this.arg.deriv(v), d);
    }

    // print(): string {
    //     return "ReLU(" + this.arg.print() + ")";
    // }
}

export interface ActivationClass {
    new(arg: Differentiable): ExprUnary;
}
export { ActivationLogistic, ActivationSoftplus };
