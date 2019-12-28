class Differentiable {
    value() { throw new Error("Cannot call abstract method!"); }
    deriv(name) { throw new Error("Cannot call abstract method!"); }

    print() { throw new Error("Cannot call abstract method!"); }
}

class Expression extends Differentiable {
    _value = null;
    value() {
        if (this._value === null) {
            this._value = this.valueImpl();
        }
        return this._value;
    }
    valueImpl(name) {
        throw new Error("Cannot call abstract method!");
    }

    _deriv = new Map();
    deriv(name) {
        if (!this._deriv.has(name)) {
            this._deriv.set(name, this.derivImpl(name));
        }
        return this._deriv.get(name);
    }
    derivImpl(name) {
        throw new Error("Cannot call abstract method!");
    }

    reset() {
        this._value = null;
        this._deriv = new Map();
    }
}

export default Expression;
export { Differentiable };
