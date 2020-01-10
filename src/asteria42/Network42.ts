import * as Neuro from "../neuro";

class Network42 extends Neuro.TestableNetwork {
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
    protected Act() { return Neuro.ActivationSoftplus; }
    protected Err() { return Neuro.ErrorSquared; }
    protected hiddenSizes() { return []; }

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
        return this.getOutputLayer().getWeight('y', 0)!.value();
    }
    b(): number {
        return this.getOutputLayer().getBias('y')!.value();
    }

    value(x: number): number {
        return this.getOutput(new Map<string, number>([['x', x]])).get('y')!;
    }
}

export default Network42;
