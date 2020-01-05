import * as Neuro from "../neuro/neuro";

class Network42 extends Neuro.Network {
    protected source() {
        const x = (Math.random() + Math.random()) / 2;
        const y = (Math.random() + Math.random()) / 2;
        const xNANDy = (x > 0.5 && y > 0.5) ? 0 : 1;
        return {
            input: new Map<string, number>([['x', x], ['y', y]]),
            output: new Map<string, number>([["xNANDy", xNANDy]])
        };
    }
    protected Act() { return Neuro.ActivationLogistic; }
    protected Err() { return Neuro.ErrorSquared; }
    protected hiddenSizes() { return [2]; }

    // Convenience Methods

    value(x: number, y: number): number {
        return this.getOutput(
            new Map<string, number>([['x', x], ['y', y]])
        ).get("xNANDy")!;
    }
}

export default Network42;
