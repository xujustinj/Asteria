import { positive } from "./activations";
import { HiddenLayer, OutputLayer } from "./layers";


abstract class Logistic {
    static value(x: number): number {
        return positive(1 / (1 + Math.exp(-x)));
    }

    static deriv(x: number): number {
        return positive(1 / (Math.exp(x) + 2 + Math.exp(-x)));
    }
}


class LogisticHiddenLayer extends HiddenLayer {
    protected actValue(x: number): number {
        return Logistic.value(x);
    }

    protected actDeriv(x: number): number {
        return Logistic.deriv(x);
    }
}

class LogisticOutputLayer extends OutputLayer {
    protected actValue(x: number): number {
        return Logistic.value(x);
    }

    protected actDeriv(x: number): number {
        return Logistic.deriv(x);
    }
}


export default Logistic;
export { LogisticHiddenLayer, LogisticOutputLayer };
