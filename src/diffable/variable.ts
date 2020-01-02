import Differentiable from "./differentiable";

class Variable implements Differentiable {
    private name: string;
    private val: number;

    constructor(name: string, val: number = 0) {
        this.name = name;
        this.val = val;
    }

    bind(val: number) { this.val = val; }

    value(): number { return this.val; }
    deriv(v: Variable): number { return (v === this) ? 1 : 0; }

    print(): string { return this.name; }
}

export default Variable;
