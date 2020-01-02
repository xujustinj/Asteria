import { ExprUnary } from '../diffable/expression';
import DVariable from '../diffable/variable';

class ActivationLogistic extends ExprUnary {
    protected valueImpl(): number {
        let x = this.arg.value();
        let y = 1 / (1 + Math.exp(-x));
        return isFinite(y) ? y : ((x < 0) ? 0 : 1);
    }

    protected derivImpl(v: DVariable): number {
        let val = this.arg.value();
        let d = this.arg.deriv(v) / (Math.exp(val) + 2 + Math.exp(-val));
        return isFinite(d) ? d : 0;
    }

    print(): string {
        return "σ(" + this.arg.print() + ")";
    }
}

class ActivationSoftplus extends ExprUnary {
    protected valueImpl(): number {
        let x = this.arg.value();
        let y = 1 + Math.exp(x);
        return isFinite(y) ? Math.log(y) : x;
    }

    protected derivImpl(v: DVariable): number {
        let x = this.arg.value();
        let df = 1 / (1 + Math.exp(-x));
        df = isFinite(df) ? df : 0;
        return df * this.arg.deriv(v);
    }

    print(): string {
        return "ReLU(" + this.arg.print() + ")";
    }
}

export { ActivationLogistic, ActivationSoftplus };
