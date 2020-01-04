import Neuron, {
    InputNeuron,
    TrainableNeuron, HiddenNeuron, OutputNeuron
} from "./neurons";
import { Differentiable, VarSum } from "../diffable/diffable";
import { ActivationClass } from "./activation";
import { ErrorClass } from "./error";
import { Weight, Bias } from "./parameters";
import Trainable from "./trainable";

abstract class Layer {
    abstract get(): Neuron[];
    print(): string {
        return "[" + this.get().map((n) => n.print()).join(", ") + "]";
    }

    size(): number { return this.get().length; }
}

class InputLayer extends Layer {
    private neurons: Map<string, InputNeuron>;

    constructor(...names: string[]) {
        super();
        this.neurons = new Map();
        for (const name of names) {
            this.neurons.set(name, new InputNeuron(name));
        }
    }

    get(): Neuron[] { return Array.from(this.neurons.values()); }
    getNeuron(name: string): Neuron | undefined {
        return this.neurons.get(name);
    }

    values(): Map<string, number> {
        let map = new Map<string, number>();
        for (const [name, node] of this.neurons) {
            map.set(name, node.value());
        }
        return map;
    }

    bind(vals: Map<string, number>) {
        for (const [name, neuron] of this.neurons) {
            neuron.bind(vals.get(name) ?? 0);
        }
    }
}

abstract class TrainableLayer extends Layer implements Trainable {
    abstract get(): TrainableNeuron[];

    study(error: Differentiable) {
        this.get().forEach((n) => n.study(error));
    }
    learn(sensitivity: number) {
        this.get().forEach((n) => n.learn(sensitivity));
    }

    reset() {
        this.get().forEach((n) => n.reset());
    }
}

class HiddenLayer extends TrainableLayer {
    private neurons: TrainableNeuron[];

    constructor(parent: Layer, Act: ActivationClass, size: number) {
        super();
        this.neurons = [];
        for (let i = 0; i < size; ++i) {
            this.neurons.push(new HiddenNeuron(Act, ...parent.get()))
        }
    }

    get(): TrainableNeuron[] { return this.neurons; }
    getNeuron(index: number): Neuron {
        return this.neurons[index];
    }

    getWeight(childIndex: number, parentIndex: number): Weight {
        return this.neurons[childIndex].getWeight(parentIndex);
    }
    getBias(childIndex: number): Bias {
        return this.neurons[childIndex].getBias();
    }

    values(): number[] { return this.neurons.map((n) => n.value())};
}

class OutputLayer extends TrainableLayer {
    private neurons: Map<string, OutputNeuron>;
    private err: VarSum;

    constructor(
        parent: Layer,
        Act: ActivationClass,
        Err: ErrorClass,
        ...names: string[]
    ) {
        super();
        this.neurons = new Map();
        for (const name of names) {
            this.neurons.set(
                name,
                new OutputNeuron(name, Act, Err, ...parent.get())
            );
        }
        this.err = new VarSum(
            ...Array.from(this.neurons.values()).map((n) => n.getErr())
        );
    }

    get(): TrainableNeuron[] { return Array.from(this.neurons.values()); }
    getNeuron(name: string): Neuron | undefined {
        return this.neurons.get(name);
    }

    getWeight(childName: string, parentIndex: number): Weight | undefined {
        return this.neurons.get(childName)?.getWeight(parentIndex);
    }
    getBias(name: string): Bias | undefined {
        return this.neurons.get(name)?.getBias();
    }

    getErr(): Differentiable { return this.err; }
    valueErr(): number { return this.getErr().value(); }
    printErr(): string { return this.getErr().print(); }

    values(): Map<string, number> {
        let map = new Map<string, number>();
        for (const [name, node] of this.neurons) {
            map.set(name, node.value());
        }
        return map;
    }

    bind(vals: Map<string, number>) {
        for (const [name, neuron] of this.neurons) {
            neuron.bind(vals.get(name) ?? 0);
        }
    }

    reset() {
        super.reset();
        this.err.reset();
    }
}

export default Layer;
export { InputLayer, HiddenLayer, OutputLayer };
