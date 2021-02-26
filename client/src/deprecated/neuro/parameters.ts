import { Differentiable, Variable, BinProduct } from "../diffable";
import Trainable from "./trainable";
import Neuron from "./neurons";

abstract class Parameter implements Trainable {
    private adjustments: number[];
    private velocity: number;

    constructor() {
        this.adjustments = [];
        this.velocity = 0;
    }

    abstract get(): Variable;
    value(): number { return this.get().value(); }
    print(): string { return this.get().print(); }

    abstract getExpr(): Differentiable;

    study(err: Differentiable) {
        this.adjustments.push(-this.studyImpl(err));
    }
    protected abstract studyImpl(error: Differentiable): number;

    learn(sensitivity: number, friction: number) {
        if (this.adjustments.length > 0) {
            const adjustment = this.adjustments.reduce(
                (acc, t) => acc + t, 0
            ) * sensitivity / this.adjustments.length;
            this.velocity = this.velocity * (1 - friction) + adjustment;
            this.learnImpl(this.velocity);
            this.adjustments = [];
        }
    }
    protected abstract learnImpl(adjustment: number): void;
}

class Weight extends Parameter {
    private static count: number = 0;

    private w: Variable;
    private t: BinProduct;

    constructor(n: Neuron, weight: number) {
        super();
        this.w = new Variable("w" + Weight.count, weight);
        this.t = new BinProduct(this.w, n.get());
        ++Weight.count;
    }

    get(): Variable { return this.w; }
    getExpr(): Differentiable { return this.t; }

    protected studyImpl(err: Differentiable): number {
        return err.deriv(this.w);
    }
    protected learnImpl(adjustment: number) {
        this.w.bind(this.value() + adjustment);
    }

    reset() {
        this.t.reset();
    }
}

class Bias extends Parameter {
    static count: number = 0;

    private b: Variable;

    constructor() {
        super();
        this.b = new Variable("b" + Bias.count, 0);
        ++Bias.count;
    }

    get(): Variable { return this.b; }
    getExpr(): Differentiable { return this.get(); }

    protected studyImpl(error: Differentiable): number {
        return error.deriv(this.b);
    }
    protected learnImpl(adjustment: number) {
        this.b.bind(this.value() + adjustment);
    }
}

export { Weight, Bias };
