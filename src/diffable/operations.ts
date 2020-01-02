import { ExprBinary, ExprVariadic } from './expression';
import Variable from './variable';

class BinProduct extends ExprBinary {
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

class VarSum extends ExprVariadic {
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

export { BinProduct, VarSum };
