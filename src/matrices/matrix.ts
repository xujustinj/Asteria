class SymMatrix implements Matrix {
    entries: number[][];
    size: number;

    constructor(
        entries: number[][],
        size: number | undefined = undefined
    ) {
        this.entries = entries;
        this.size = (size === undefined) ? this.entries.length : size;
    }

    get(i: number, j: number): number { return this.entries[i][j]; }
    row(i: number): number[] { return this.entries[i]; }
    col(j: number): number[] { return this.entries[j]; }
    rows(): number[][] { return this.entries; }
    cols(): number[][] { return this.entries; }

    height(): number { return this.size; }
    width(): number { return this.size; }
    transpose(): SymMatrix { return this; }

    print(): string {
        return this.entries.map((row) => row.join()).join('\n');
    }
}

class AsymMatrix {
    entries: number[][];
    h: number;
    w: number;
    t: number[][] | null;

    // height, width, and transpose can all be computed from the given entries at the cost of performance.
    constructor(
        entries: number[][],
        height: number | undefined = undefined,
        width: number | undefined = undefined,
        transpose: number[][] | undefined = undefined
    ) {
        this.entries = entries;
        this.h = (height === undefined) ? entries.length : height;
        this.w = (width === undefined) ? entries[0].length : width;
        this.t = (transpose === undefined) ? null : transpose;
    }

    get(i: number, j: number): number { return this.entries[i][j]; }
    row(i: number): number[] { return this.entries[i]; }
    col(j: number): number[] { this.setT(); return this.t![j]; }
    rows(): number[][] { return this.entries; }
    cols(): number[][] { this.setT(); return this.t!; }

    height(): number { return this.h; }
    width(): number { return this.w; }
    transpose(): AsymMatrix {
        this.setT();
        return new AsymMatrix(this.t!, this.w, this.h, this.entries);
    }
    setT() {
        if (this.t === null) {
            this.t = new Array(this.w);
            for (let i = 0; i < this.w; ++i) {
                this.t[i] = this.entries.map((row) => row[i]);
            }
        }
    }

    print(): string {
        return this.entries.map((row) => row.join()).join('\n');
    }
}

export default interface Matrix {
    get(i: number, j: number): number;
    row(i: number): number[];
    col(j: number): number[];
    rows(): number[][];
    cols(): number[][];

    height(): number;
    width(): number;
    transpose(): Matrix;

    print(): string;
}
export { SymMatrix, AsymMatrix };
