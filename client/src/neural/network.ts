import Layer, { InputLayer, HiddenLayer, OutputLayer } from "./layers";

type Input = Map<string, number>;
type Output = Map<string, number>;
type Sample = { input: Input; output: Output; };

abstract class Network {
    private _inputLayer: InputLayer;
    private _hiddenLayers: HiddenLayer[];
    private _outputLayer: OutputLayer;

    protected studied: { sample: Sample, err: number }[];

    protected abstract source(count: number): Sample[];
    protected abstract hiddenSizes(): number[];
    protected abstract makeHiddenLayer(prev: Layer, size: number): HiddenLayer;
    protected abstract makeOutputLayer(
        prev: Layer, ...names: string[]
    ): OutputLayer;

    constructor() {
        this.studied = [];

        const { input, output } = this.source(1)[0];
        const inputNames: string[] = Array.from(input.keys());
        const outputNames: string[] = Array.from(output.keys());

        this._inputLayer = new InputLayer(...inputNames);
        this._hiddenLayers = [];
        let prev: Layer = this._inputLayer;
        for (const size of this.hiddenSizes()) {
            this._hiddenLayers.push(this.makeHiddenLayer(prev, size));
            prev = this._hiddenLayers[this._hiddenLayers.length - 1];
        }
        this._outputLayer = this.makeOutputLayer(prev, ...outputNames);
    }

    print(): string {
        return this._hiddenLayers.map(
            (n) => n.print()
        ).join("\n") + "\n" + this._outputLayer.print();
    }

    inputLayer(): InputLayer { return this._inputLayer; }
    hiddenLayer(i: number): HiddenLayer { return this._hiddenLayers[i]; }
    outputLayer(): OutputLayer { return this._outputLayer; }

    error(): number { return this._outputLayer.error(); }

    avgErr(): number {
        return this.studied.reduce(
            (acc, study) => acc + study.err, 0
        ) / this.studied.length;
    }

    bind(input: Input, output: Output | null = null) {
        this.reset();
        this._inputLayer.bind(input);
        if (output !== null) { this._outputLayer.bind(output); }
    }
    output(input: Input | null = null): Map<string, number> {
        if (input !== null) { this.bind(input) };
        return this._outputLayer.output();
    }

    study(count: number) {
        this.studied = this.source(count).map((sample) => {
            this.bind(sample.input, sample.output);
            this._outputLayer.studyBindings();
            return { sample: sample, err: this._outputLayer.error() };
        });
    }
    learn(sensitivity: number, friction: number) {
        this._outputLayer.learn(sensitivity, friction);
        // console.log(this.print());
    }

    reset() {
        this._outputLayer.reset();
    }
}


abstract class TestableNetwork extends Network {
    protected abstract tests(): Sample[];

    rsq(): number {
        const tests = this.tests();
        return tests.reduce((acc, { input, output }) => {
            this.bind(input, output);
            return acc + this.error();
        }, 0) / tests.length;
    }
    r(): number {
        return Math.sqrt(this.rsq());
    }
}


export default Network
export { TestableNetwork };
