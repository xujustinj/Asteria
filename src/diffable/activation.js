import Expression from './expression.js';

class Logistic extends Expression {
    constructor(arg) {
        super();
        this.arg = arg;
    }

    valueImpl() {
        let x = this.arg.value();
        let y = 1 / (1 + Math.exp(-x));
        return isFinite(y) ? y : ((x < 0) ? 0 : 1);
    }

    derivImpl(name) {
        let val = this.arg.value();
        let d = this.arg.deriv(name) / (Math.exp(val) + 2 + Math.exp(-val));
        return isFinite(d) ? d : 0;
    }

    print() {
        return "σ(" + this.arg.print() + ")";
    }
}

class Softplus extends Expression {
    constructor(arg) {
        super();
        this.arg = arg;
    }

    valueImpl() {
        let x = this.arg.value();
        let y = 1 + Math.exp(x);
        return isFinite(y) ? Math.log(y) : x;
    }

    derivImpl(name) {
        let x = this.arg.value();
        let df = 1 / (1 + Math.exp(-x));
        df = isFinite(df) ? df : 0;
        return df * this.arg.deriv(name);
    }

    print() {
        return "ReLU(" + this.arg.print() + ")";
    }
}

export { Logistic, Softplus };
