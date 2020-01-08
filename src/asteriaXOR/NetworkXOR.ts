import * as Neuro from "../neuro/neuro";

class NetworkXOR extends Neuro.Network {
    protected source(count: number) {
        let arr = [];
        for (let i = 0; i < count; ++i) {
            const x = Math.random();
            const y = Math.random();
            const xXORy = ((x > 0.5) === (y > 0.5)) ? 0 : 1;
            arr.push({
                input: new Map<string, number>([['x', x], ['y', y]]),
                output: new Map<string, number>([["xXORy", xXORy]])
            });
        }
        return arr;
    }
    protected Act() { return Neuro.ActivationLogistic; }
    protected Err() { return Neuro.ErrorSquared; }
    protected hiddenSizes() { return [4, 4, 4, 2]; }

    // Convenience Methods

    value(x: number, y: number): number {
        return this.getOutput(
            new Map<string, number>([['x', x], ['y', y]])
        ).get("xXORy")!;
    }
}

export default NetworkXOR;
