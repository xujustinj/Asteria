import * as Neural from "../neural";

class Network42 extends Neural.TestableNetwork {
    protected source(count: number) {
        this.studied.sort((a, b) => b.err - a.err);
        let arr = this.studied.slice(0, count / 2).map(
            (study) => study.sample
        );
        for (let i = arr.length; i < count; ++i) {
            arr.push({
                input: new Map<string, number>([['x', Math.random()]]),
                output: new Map<string, number>([['y', 42]])
            });
        }
        return arr;
    }
    protected hiddenSizes() { return []; }
    protected makeHiddenLayer(prev: Neural.Layer, width: number) {
        return new Neural.SoftplusHiddenLayer(prev, width);
    }
    protected makeOutputLayer(prev: Neural.Layer, ...names: string[]) {
        return new Neural.SoftplusOutputLayer(prev, ...names);
    }

    private cachedTests = [
        {
            input: new Map<string, number>([['x', 0]]),
            output: new Map<string, number>([['y', 42]])
        },
        {
            input: new Map<string, number>([['x', 1]]),
            output: new Map<string, number>([['y', 42]])
        }
    ];
    protected tests() { return this.cachedTests; }

    // Convenience Methods

    m(): number {
        return this.outputLayer().weight(0, 'y');
    }
    b(): number {
        return this.outputLayer().bias('y');
    }

    value(x: number): number {
        return this.output(new Map<string, number>([['x', x]])).get('y')!;
    }
}

export default Network42;
