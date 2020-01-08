function standardBasis(dim: number): number[][] {
    let basis: number[][] = new Array(dim);
    for (let i = 0; i < dim; ++i) {
        basis[i] = new Array(dim).fill(0);
        basis[i][i] = 1;
    }
    return basis;
}
function standardHalfCube(dim: number): number[][] {
    const last: number = dim - 1;
    const count: number = 1 << last; // 2^last
    let vectors: number[][] = new Array(dim);
    const srd: number = 1 / Math.sqrt(dim);
    vectors[last] = new Array(count).fill(-srd)
    for (let i = 0; i < last; ++i) {
        const blockSize: number = 1 << i; // 2^i
        vectors[i] = new Array(blockSize).fill(-srd).concat(
            new Array(blockSize).fill(srd)
        );
        for (let j = i + 1; j < last; ++j) {
            vectors[i] = vectors[i].concat(vectors[i]);
        }
    }
    return vectors;
}

function orthoHalfBasis(dim: number): number[][] {
    return concat(standardBasis(dim), standardHalfCube(dim));
}
function orthoFullBasis(dim: number): number[][] {
    const half = concat(standardBasis(dim), standardHalfCube(dim));
    return concat(half, half.map((row) => row.map((n) => -n)));
}
function orthoVectors(dim: number, count: number, full: boolean): number[][] {
    const basis = (full) ? orthoFullBasis(dim) : orthoHalfBasis(dim);
    let vectors: number[][] = []
    while (vectors.length < count) {
        vectors = vectors.concat(transpose(randomRotate(basis, 0)));
    }
    return vectors.slice(0, count);
}

function transpose(matrix: number[][]): number[][] {
    const width = matrix[0].length;
    let t = new Array(width);
    for (let i = 0; i < width; ++i) {
        t[i] = column(matrix, i);
    }
    return t;
}
function concat(a: number[][], b: number[][]): number[][] {
    return a.map((row, index) => row.concat(b[index]));
}
function multiply(a: number[][], b: number[][]) {
    const aHeight: number = a.length;
    const bHeight: number = b.length;
    const bWidth: number = b[0].length;
    let c: number[][] = new Array(aHeight);
    for (let i = 0; i < aHeight; ++i) {
        c[i] = new Array(bWidth).fill(0);
        for (let j = 0; j < bWidth; ++j) {
            for (let k = 0; k < bHeight; ++k) {
                c[i][j] += a[i][k] * b[k][j];
            }
        }
    }
    return c;
}

function randomRotation(dim: number, x: number, y: number): number[][] {
    if (x > y) { return randomRotation(dim, y, x); }
    let basis: number[][] = standardBasis(dim);
    basis[x][x] = Math.random();
    basis[y][y] = basis[x][x];
    basis[y][x] = Math.sqrt(1 - basis[x][x] * basis[x][x]);
    basis[x][y] = -basis[y][x];
    return basis;
}
function randomRotate(matrix: number[][], x: number): number[][] {
    const dim: number = matrix.length;
    let rotations: number[][][] = new Array(dim - 1);
    for (let i = 0; i < x; ++i) {
        rotations[i] = randomRotation(dim, x, i);
    }
    for (let i = x + 1; i < dim; ++i) {
        rotations[i - 1] = randomRotation(dim, x, i);
    }
    return multiply(rotations.reduce(
        (acc, rotation) => {
            const a = multiply(acc, rotation);
            return a;
        }, standardBasis(dim)
    ), matrix);
}

function column(matrix: number[][], c: number): number[] {
    return matrix.map((row) => row[c]);
}
function dotProduct(u: number[], v: number[]): number {
    return u.reduce((acc, n, i) => acc + n * v[i], 0);
}

function print(matrix: number[][]): string {
    return matrix.map((row) => row.join()).join('\n');
}

export {
    standardBasis, standardHalfCube,
    orthoHalfBasis, orthoFullBasis, orthoVectors,
    transpose, concat, multiply,
    randomRotation, randomRotate,
    column, dotProduct,
    print
};
