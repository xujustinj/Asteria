import Differentiable from './differentiable';

class Variable implements Differentiable {
    name: string;
    val: number;

    constructor(name: string, val: number) {
        this.name = name;
        this.val = val;
    }

    bind(val: number) { this.val = val; }

    value(): number { return this.val; }
    deriv(v: Variable): number { return (v === this) ? 1 : 0; }

    print(): string { return this.name; }
}

export default Variable;
