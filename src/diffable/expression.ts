import Differentiable from "./differentiable";
import Variable from "./variable";

abstract class Expression implements Differentiable {
    private _value: number = NaN;
    value(): number {
        if (!isFinite(this._value)) {
            this._value = this.valueImpl();
        }
        return this._value;
    }
    protected abstract valueImpl(): number;

    private _deriv = new Map<Variable, number>();
    deriv(v: Variable): number {
        if (!this._deriv.has(v)) {
            this._deriv.set(v, this.derivImpl(v));
        }
        return this._deriv.get(v) as number;
    }
    protected abstract derivImpl(_v: Variable): number;

    // abstract print(): string;

    reset() {
        this._value = NaN;
        this._deriv.clear();
    }
}

abstract class ExprUnary extends Expression {
    protected arg: Differentiable;

    constructor(arg: Differentiable) {
        super();
        this.arg = arg;
    }
}

abstract class ExprBinary extends Expression {
    protected left: Differentiable;
    protected right: Differentiable;

    constructor(left: Differentiable, right: Differentiable) {
        super();
        this.left = left;
        this.right = right;
    }
}

abstract class ExprVariadic extends Expression {
    protected terms: Differentiable[];

    constructor(...terms: Differentiable[]) {
        super();
        this.terms = terms;
    }
}

export default Expression;
export { ExprUnary, ExprBinary, ExprVariadic };
