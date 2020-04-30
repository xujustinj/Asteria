import Matrix, { AsymMatrix } from "./matrix";

function dot(v: number[], u: number[]): number {
    return v.reduce((acc, n, i) => acc + n * u[i], 0);
}

// Multiplies v and u as two matrices.
function multVV(v: number[], u: number[]): number[][] {
    return v.map((n) => u.map((m) => m * n));
}

// Multiplies a and b.
function multMM(a: Matrix, b: Matrix): AsymMatrix {
    return new AsymMatrix(a.rows().map((row) =>
        b.cols().map((col) =>
            dot(row, col)
        )
    ), a.height(), b.width());
}

// Multiplies a and v.
function multMV(a: Matrix, v: number[]): number[] {
    return a.rows().map((r) => dot(r, v));
}

// Multiplies a and v and adds u.
function multMVplusV(a: Matrix, v: number[], u: number[]) {
    return a.rows().map((r, i) =>
        r.reduce((acc, n, j) => acc + n * v[j], u[i])
    );
}

// Multiplies the transpose of a and v.
function multMtV(a: Matrix, v: number[]): number[] {
    return a.cols().map((c) => dot(c, v));
}

export { dot, multVV, multMM, multMV, multMVplusV, multMtV };
