import Differentiable from './differentiable';
import Variable from './variable';

abstract class Expression implements Differentiable {
    _value: number = NaN;
    value(): number {
        if (!isFinite(this._value)) {
            this._value = this.valueImpl();
        }
        return this._value;
    }
    protected abstract valueImpl(): number;

    _deriv = new Map<Variable, number>();
    deriv(v: Variable): number {
        if (!this._deriv.has(v)) {
            this._deriv.set(v, this.derivImpl(v));
        }
        return this._deriv.get(v) as number;
    }
    protected abstract derivImpl(_v: Variable): number;

    abstract print(): string;

    reset() {
        this._value = NaN;
        this._deriv.clear();
    }
}

export default Expression;
