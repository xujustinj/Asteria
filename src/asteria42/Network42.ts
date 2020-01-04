import * as Neuro from "../neuro/neuro";

class Network42 extends Neuro.Network {
    protected source() {
        return {
            input: new Map<string, number>([['x', Math.random()]]),
            output: new Map<string, number>([['y', 42]])
        };
    }
    protected Act() { return Neuro.ActivationSoftplus; }
    protected Err() { return Neuro.ErrorSquared; }
    protected hiddenSizes() { return []; }

    // Convenience Methods

    m(): number {
        return this.getOutputLayer().getWeight('y', 0)!.value();
    }
    b(): number {
        return this.getOutputLayer().getBias('y')!.value();
    }
    rsq(): number {
        return this.getErr().value();
    }
    value(x: number): number {
        return this.getOutput(new Map<string, number>([['x', x]])).get('y')!;
    }
}

export default Network42;
