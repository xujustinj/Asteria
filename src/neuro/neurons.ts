import {
    Differentiable,
    ExprUnary, ExprBinary,
    Variable,
    VarSum
} from "../diffable/diffable";
import Trainable from "./trainable";
import { Weight, Bias } from "./parameters";
import { ActivationClass } from "./activation";
import { ErrorClass } from "./error";

abstract class Neuron {
    abstract get(): Differentiable;
    value(): number { return this.get().value(); }
    abstract print(): string;
}

class InputNeuron extends Neuron {
    private x: Variable;

    constructor(name: string) {
        super();
        this.x = new Variable(name);
    }

    get(): Differentiable { return this.x; }
    print(): string { return this.x.print(); }

    bind(val: number) { this.x.bind(val); }
}

abstract class TrainableNeuron extends Neuron implements Trainable {
    private weights: Weight[];
    private bias: Bias;
    private sum: VarSum;
    private exp: ExprUnary;

    constructor(Act: ActivationClass, ...weights: Weight[]) {
        super();
        this.weights = weights;
        this.bias = new Bias();

        const terms = this.weights.map((c) => c.getExpr());
        this.sum = new VarSum(...terms, this.bias.getExpr());
        this.exp = new Act(this.sum);
    }

    get(): Differentiable { return this.exp; }
    print(): string {
        return "[" + this.weights.map(
            (w) => w.value()
        ).join(" ") + "] " + this.bias.value();
    }

    getWeight(parentIndex: number): Weight { return this.weights[parentIndex]; }
    getBias(): Bias { return this.bias; }

    study(error: Differentiable) {
        this.weights.forEach((w) => w.study(error));
        this.bias.study(error);
    }
    learn(sensitivity: number, friction: number) {
        this.weights.forEach((w) => w.learn(sensitivity, friction));
        this.bias.learn(sensitivity, friction);
    }

    reset() {
        this.exp.reset();
        this.sum.reset();
        this.weights.forEach((w) => w.reset());
    }
}

class HiddenNeuron extends TrainableNeuron {}

class OutputNeuron extends TrainableNeuron {
    private y: Variable;
    private err: ExprBinary;

    constructor(
        name: string,
        Act: ActivationClass,
        Err: ErrorClass,
        ...weights: Weight[]
    ) {
        super(Act, ...weights);
        this.y = new Variable(name);
        this.err = new Err(this.get(), this.y);
    }

    getErr(): Differentiable { return this.err; }
    valueErr(): number { return this.getErr().value(); }
    printErr(): string { return this.getErr().print(); }

    bind(val: number) { this.y.bind(val); }

    reset() {
        super.reset();
        this.err.reset();
    }
}

export default Neuron;
export { InputNeuron, TrainableNeuron, HiddenNeuron, OutputNeuron };
