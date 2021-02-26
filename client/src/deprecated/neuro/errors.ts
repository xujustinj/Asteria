import { Differentiable, ExprBinary, Variable } from "../diffable";

class ErrorSquared extends ExprBinary {
    protected valueImpl(): number {
        let diff = this.left.value() - this.right.value();
        return diff * diff;
    }

    protected derivImpl(v: Variable): number {
        let diff = this.left.value() - this.right.value();
        return 2 * diff * (this.left.deriv(v) - this.right.deriv(v));
    }

    // print(): string {
    //     return "(" + this.left.print() + " - " + this.right.value() + ")^2";
    // }
}

class ErrorTessaracted extends ExprBinary {
    protected valueImpl(): number {
        let diff = this.left.value() - this.right.value();
        let dsq = diff * diff;
        return dsq * dsq;
    }

    protected derivImpl(v: Variable): number {
        let diff = this.left.value() - this.right.value();
        return 4 * diff * diff * diff * (this.left.deriv(v) - this.right.deriv(v));
    }

    // print(): string {
    //     return "(" + this.left.print() + " - " + this.right.value() + ")^4";
    // }
}

export interface ErrorClass {
    new(left: Differentiable, right: Differentiable): ExprBinary;
}
export { ErrorSquared, ErrorTessaracted };
