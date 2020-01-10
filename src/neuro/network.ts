import Layer, { InputLayer, HiddenLayer, OutputLayer } from "./layers";
import { ActivationClass } from "./activations";
import { ErrorClass, ErrorSquared } from "./errors";
import { Differentiable } from "../diffable";

type Input = Map<string, number>;
type Output = Map<string, number>;
type Sample = { input: Input; output: Output; };

abstract class Network {
    private inputLayer: InputLayer;
    private hiddenLayers: HiddenLayer[];
    private outputLayer: OutputLayer;

    protected studied: { sample: Sample, err: number }[];

    protected abstract source(count: number): Sample[];
    protected abstract Act(): ActivationClass;
    protected abstract Err(): ErrorClass;
    protected abstract hiddenSizes(): number[];

    constructor() {
        this.studied = [];

        const { input, output } = this.source(1)[0];
        const inputNames = Array.from(input.keys());
        const outputNames = Array.from(output.keys());

        this.inputLayer = new InputLayer(...inputNames);
        this.hiddenLayers = [];
        let last: Layer = this.inputLayer;
        for (const size of this.hiddenSizes()) {
            this.hiddenLayers.push(new HiddenLayer(last, this.Act(), size));
            last = this.hiddenLayers[this.hiddenLayers.length - 1];
        }
        this.outputLayer = new OutputLayer(
            last,
            this.Act(),
            this.Err(),
            ...outputNames
        );
    }

    print(): string {
        return this.hiddenLayers.map(
            (n) => n.print()
        ).join("\n") + "\n" + this.outputLayer.print();
    }

    getInputLayer(): InputLayer { return this.inputLayer; }
    getHiddenLayer(i: number): HiddenLayer { return this.hiddenLayers[i]; }
    getOutputLayer(): OutputLayer { return this.outputLayer; }

    getErr(): Differentiable { return this.outputLayer.getErr(); }
    valueErr(): number { return this.outputLayer.valueErr(); }

    avgErr(): number {
        return this.studied.reduce(
            (acc, study) => acc + study.err, 0
        ) / this.studied.length;
    }

    bind(input: Input, output: Output | null = null) {
        this.reset();
        this.inputLayer.bind(input);
        if (output) { this.outputLayer.bind(output); }
    }
    getOutput(input: Input): Output {
        this.bind(input);
        return this.outputLayer.values();
    }

    study(count: number) {
        this.studied = this.source(count).map((sample) => {
            this.bind(sample.input, sample.output);
            const err = this.outputLayer.getErr();
            this.hiddenLayers.forEach((layer) => layer.study(err));
            this.outputLayer.study(err);
            return { sample: sample, err: err.value() };
        });
    }
    learn(sensitivity: number, friction: number) {
        this.hiddenLayers.forEach(
            (layer) => layer.learn(sensitivity, friction)
        );
        this.outputLayer.learn(sensitivity, friction);
    }

    reset() {
        this.hiddenLayers.forEach((layer) => layer.reset());
        this.outputLayer.reset();
    }
}

abstract class TestableNetwork extends Network {
    protected Err(): ErrorClass { return ErrorSquared; }

    protected abstract tests(): Sample[];
    rsq(): number {
        const tests = this.tests();
        return tests.reduce((acc, { input, output }) => {
            this.bind(input, output);
            return acc + this.valueErr();
        }, 0) / tests.length;
    }
    r(): number {
        return Math.sqrt(this.rsq());
    }
}

export { Network, TestableNetwork };
