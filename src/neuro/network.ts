import Layer, { InputLayer, HiddenLayer, OutputLayer } from "./layers";
import { ActivationClass } from "./activation";
import { ErrorClass } from "./error";
import Differentiable from "../diffable/differentiable";

type Sample = { input: Map<string, number>; output: Map<string, number>; };

abstract class Network {
    private inputLayer: InputLayer;
    private hiddenLayers: HiddenLayer[];
    private outputLayer: OutputLayer;

    protected abstract source(): Sample;
    protected abstract Act(): ActivationClass;
    protected abstract Err(): ErrorClass;
    protected abstract hiddenSizes(): number[];

    constructor() {
        const { input, output } = this.source();
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
    printErr(): string { return this.outputLayer.printErr(); }

    getOutput(input: Map<string, number>): Map<string, number> {
        this.reset();
        this.inputLayer.bind(input);
        return this.outputLayer.values();
    }

    study() {
        this.reset();
        const { input, output } = this.source();
        this.inputLayer.bind(input);
        this.outputLayer.bind(output);
        const err = this.outputLayer.getErr();
        this.hiddenLayers.forEach((layer) => layer.study(err));
        this.outputLayer.study(err);
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

export default Network;
