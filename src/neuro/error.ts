import { ExprBinary } from '../diffable/expression';
import Variable from '../diffable/variable';

class ErrorSquared extends ExprBinary {
    protected valueImpl(): number {
        let diff = this.left.value() - this.right.value();
        return diff * diff;
    }

    protected derivImpl(v: Variable): number {
        let diff = this.left.value() - this.right.value();
        return 2 * diff * (this.left.deriv(v) - this.right.deriv(v));
    }

    print(): string {
        return "(" + this.left.print() + " - " + this.right.value() + ")^2";
    }
}

export { ErrorSquared };
