import * as Neuro from "../neuro";

class NetworkXOR extends Neuro.TestableNetwork {
    protected source(count: number) {
      this.studied.sort((a, b) => b.err - a.err);
      const quarter = count / 4;
      let arr = this.studied.slice(quarter, 2 * quarter).map(
          (study) => study.sample
      );
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
    protected hiddenSizes() { return [2, 4, 4]; }

    private cachedTests = (() => {
        let tests = [];
        for (let x = 0; x <= 1; x += 0.1) {
            for (let y = 0; y <= 1; y += 0.1) {
              const xXORy = ((x > 0.5) === (y > 0.5)) ? 0 : 1;
                tests.push({
                    input: new Map<string, number>([['x', x], ['y', y]]),
                    output: new Map<string, number>([["xXORy", xXORy]])
                });
            }
        }
        return tests;
    })();
    protected tests() { return this.cachedTests; }

    // Convenience Methods

    value(x: number, y: number): number {
        return this.getOutput(
            new Map<string, number>([['x', x], ['y', y]])
        ).get("xXORy")!;
    }
}

export default NetworkXOR;
