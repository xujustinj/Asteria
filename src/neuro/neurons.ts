import {
    Differentiable,
    ExprUnary, ExprBinary,
    Variable,
    VarSum
} from "../diffable/diffable";
import Trainable from "./trainable";
import { Weight, Bias } from "./parameters";

interface ExprUnaryClass {
    new (arg: Differentiable): ExprUnary;
}
interface ExprBinaryClass {
    new (left: Differentiable, right: Differentiable): ExprBinary;
}

abstract class Neuron {
    value(): number { return this.get().value(); }
    abstract get(): Differentiable;
    print(): string { return this.get().print(); }
}

class InputNeuron extends Neuron {
    private x: Variable;

    constructor(name: string) {
        super();
        this.x = new Variable(name);
    }

    get(): Differentiable { return this.x; }

    bind(val: number) { this.x.bind(val); }
}

class TrainableNeuron extends Neuron implements Trainable {
    weights: Weight[];
    bias: Bias;
    private sum: VarSum;
    private exp: ExprUnary;

    constructor(Activation: ExprUnaryClass, ...neurons: Neuron[]) {
        super();
        this.weights = neurons.map((p) => new Weight(p));
        this.bias = new Bias();

        const terms = this.weights.map((c) => c.get());
        this.sum = new VarSum(...terms, this.bias.get());
        this.exp = new Activation(this.sum);
    }

    get(): Differentiable { return this.exp; }

    study(error: Differentiable) {
        this.weights.forEach((w) => w.study(error));
        this.bias.study(error);
    }
    learn(sensitivity: number) {
        this.weights.forEach((w) => w.learn(sensitivity));
        this.bias.learn(sensitivity);
    }

    reset() {
        this.exp.reset();
        this.sum.reset();
        this.weights.forEach((w) => w.reset());
    }
}

class OutputNeuron extends TrainableNeuron {
    private y: Variable;
    private err: ExprBinary;

    constructor(
        name: string, Activation: ExprUnaryClass, Error: ExprBinaryClass, ...neurons: Neuron[]
    ) {
        super(Activation, ...neurons);
        this.y = new Variable(name);
        this.err = new Error(this.get(), this.y);
    }

    bind(val: number) { this.y.bind(val); }

    valueErr(): number { return this.getErr().value(); }
    getErr(): ExprBinary { return this.err; }
    printErr(): string { return this.getErr().print(); }

    reset() {
        super.reset();
        this.getErr().reset();
    }
}

export default Neuron;
export { InputNeuron, TrainableNeuron, OutputNeuron };
