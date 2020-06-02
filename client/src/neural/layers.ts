import { Matrix, multMVplusV } from "../matrices";
import { orthoVectors } from "../matrices/rotations";
import { AsymMatrix } from "../matrices/matrix";
import { multVV, multMtV } from "../matrices/operations";


function fill1D(length: number, value: number): number[] {
    return new Array(length).fill(value);
}

function fill2D(height: number, width: number, value: number): number[][] {
    const arr = [];
    while (arr.length < height) {
        arr.push(fill1D(width, value));
    }
    return arr;
}


abstract class Layer {
    width: number;

    constructor(width: number) {
        this.width = width;
    }

    abstract value(): number[];

    print(): string { return ""; }


    study(_adjustments: number[]): void {}

    learn(_sensitivity: number, _friction: number): void {}


    reset(): void {}
}


class InputLayer extends Layer {
    private _names: string[];
    private _value: number[];

    constructor(...names: string[]) {
        super(names.length);
        this._names = names;
        this._value = new Array(this.width).fill(0);
    }

    value(): number[] { return this._value; }

    print(): string {
        return this._names.reduce(((acc, name, i) =>
            acc + "\n\t" + name + ": " + this._value[i]
        ), "[") + "\n]";
    }


    bind(binding: Map<string, number>) {
        for (let i = 0; i < this.width; ++i) {
            if (binding.has(this._names[i])) {
                this._value[i] = binding.get(this._names[i])!;
            }
        }
    }

    binding(): Map<string, number> {
        let map = new Map<string, number>();
        for (let i = 0; i < this.width; ++i) {
            map.set(this._names[i], this._value[i]);
        }
        return map;
    }

    input(): Map<string, number> {
        return this.binding();
    }
}


abstract class TrainableLayer extends Layer {
    protected prev: Layer;

    protected w: Matrix;
    protected vw: number[][];
    protected aw: number[][][] = [];

    protected b: number[];
    protected vb: number[];
    protected ab: number[][] = [];

    private _preAF: number[] | null = null;
    private _value: number[] | null = null;

    constructor(prev: Layer, width: number) {
        super(width);

        this.prev = prev;

        this.w = new AsymMatrix(
            orthoVectors(prev.width, width),
            width, prev.width
        );
        this.vw = fill2D(width, prev.width, 0);

        this.b = fill1D(width, 0);
        this.vb = fill1D(width, 0);
    }

    preAF(): number[] {
        if (this._preAF === null) {
            this._preAF = multMVplusV(this.w, this.prev.value(), this.b);
        }
        return this._preAF;
    }
    value(): number[] {
        if (this._value === null) {
            this._value = this.preAF().map((x) => this.actValue(x));
        }
        return this._value;
    }

    print(): string {
        return this.w.rows().reduce(((acc, row, i) =>
            acc + "\n\t" + row.join() + "; " + this.b[i]
        ), "[") + "\n]";
    }


    study(adjustments: number[]): void {
        const preAF = this.preAF();
        const d = adjustments.map((a, i) =>
            a * this.actDeriv(preAF[i])
        );
        this.aw.push(multVV(d, this.prev.value()));
        this.ab.push(d);
        this.prev.study(multMtV(this.w, d));
    }

    learn(sensitivity: number, friction: number): void {
        const count = this.aw.length;

        for (let i = 0; i < this.width; ++i) {
            for (let j = 0; j < this.prev.width; ++j) {
                this.vw[i][j] = (1 - friction) * this.vw[i][j]
                + sensitivity * this.aw.reduce(((acc, a) =>
                    acc + a[i][j]
                ), 0) / count;
            }
            this.vb[i] = (1 - friction) * this.vb[i]
            + sensitivity * this.ab.reduce(((acc, a) =>
                acc + a[i]
            ), 0) / count;
            this.b[i] += this.vb[i];
        }
        this.w.add(this.vw);

        this.prev.learn(sensitivity, friction);
        this.aw = [];
        this.ab = [];
    }

    reset(): void {
        this._preAF = null;
        this._value = null;
        this.prev.reset();
    }


    protected abstract actValue(x: number): number;

    protected abstract actDeriv(x: number): number;
}


abstract class HiddenLayer extends TrainableLayer {
    weight(from: number, to: number): number {
        return this.w.get(to, from);
    }

    bias(to: number): number {
        return this.b[to];
    }
}


abstract class OutputLayer extends TrainableLayer {
    private _names: string[];
    private _expec: number[];

    constructor(prev: Layer, ...names: string[]) {
        super(prev, names.length);
        this._names = names;
        this._expec = new Array(this.width).fill(0);
    }

    print(): string {
        return this.w.rows().reduce(((acc, row, i) =>
            acc + "\n\t" + row.join() + "; " + this.b[i]
        ), "[") + "\n]";
    }

    studyBindings(): void {
        this.study(this.value().map((y, i) => this._expec[i] - y));
    }

    error(): number {
        return this.value().reduce((err, y, i) => {
            const d = this._expec[i] - y;
            return err + d * d;
        }, 0);
    }

    bind(binding: Map<string, number>) {
        for (let i = 0; i < this.width; ++i) {
            if (binding.has(this._names[i])) {
                this._expec[i] = binding.get(this._names[i])!;
            }
        }
    }

    binding(): Map<string, number> {
        const map = new Map<string, number>();
        for (let i = 0; i < this.width; ++i) {
            map.set(this._names[i], this._expec[i]);
        }
        return map;
    }

    output(): Map<string, number> {
        const vals = this.value();
        const map = new Map<string, number>();
        for (let i = 0; i < this.width; ++i) {
            map.set(this._names[i], vals[i]);
        }
        return map;
    }

    weight(from: number, to: string): number {
        return this.w.get(this._names.indexOf(to), from);
    }

    bias(to: string): number {
        return this.b[this._names.indexOf(to)];
    }
}


export default Layer;
export { InputLayer, HiddenLayer, OutputLayer };
