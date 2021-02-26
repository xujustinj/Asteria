import { ExprBinary, ExprVariadic } from "./expression";
import Variable from "./variable";

class BinProduct extends ExprBinary {
    protected valueImpl(): number {
        return this.left.value() * this.right.value();
    }

    protected derivImpl(v: Variable): number {
        const dlr = this.left.deriv(v) * this.right.value();
        const ldr = this.left.value() * this.right.deriv(v);
        return dlr + ldr;
    }

    // print(): string {
    //     return this.left.print() + " * " + this.right.print();
    // }
}

class VarSum extends ExprVariadic {
    protected valueImpl(): number {
        return this.terms.reduce((acc, t) => acc + t.value(), 0);
    }

    protected derivImpl(v: Variable): number {
        return this.terms.reduce((acc, t) => acc + t.deriv(v), 0);
    }

    // print(): string {
    //     return "(" + this.terms.map((t) => t.print()).join(" + ") + ")";
    // }
}

export { BinProduct, VarSum };
