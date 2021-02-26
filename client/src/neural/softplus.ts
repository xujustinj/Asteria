import { positive } from "./activations";
import { HiddenLayer, OutputLayer } from "./layers";


abstract class Softplus {
    static value(x: number): number {
        const y = 1 + Math.exp(x);
        return isFinite(y) ? positive(Math.log(y)) : x;
    }

    static deriv(x: number): number {
        return positive(1 / (1 + Math.exp(-x)));
    }
}


class SoftplusHiddenLayer extends HiddenLayer {
    protected actValue(x: number): number {
        return Softplus.value(x);
    }

    protected actDeriv(x: number): number {
        return Softplus.deriv(x);
    }
}

class SoftplusOutputLayer extends OutputLayer {
    protected actValue(x: number): number {
        return Softplus.value(x);
    }

    protected actDeriv(x: number): number {
        return Softplus.deriv(x);
    }
}


export default Softplus;
export { SoftplusHiddenLayer, SoftplusOutputLayer };
