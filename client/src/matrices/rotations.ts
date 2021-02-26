import Matrix, { AsymMatrix } from "./matrix";
import standardBasis from "./standard";
import { multMM } from "./operations";

type Plane = { x: number; y: number; };

function randomRotation(dim: number, ...planes: Plane[]): AsymMatrix {
    let basis: number[][] = new Array(dim);
    for (let i = 0; i < dim; ++i) {
        basis[i] = new Array(dim).fill(0);
        basis[i][i] = 1;
    }
    let transpose = basis;
    for (const { x, y } of planes) {
          if (x < dim && y < dim) {
            const cos = 2 * Math.random() - 1;
            const sin = Math.sqrt(1 - cos * cos);
            basis[x][x] = cos;
            basis[y][y] = cos;
            if (Math.random() < 0.5) {
                basis[x][y] = sin;
                basis[y][x] = -sin;
                transpose[x][y] = -sin;
                transpose[y][x] = sin;
            } else {
                basis[x][y] = -sin;
                basis[y][x] = sin;
                transpose[x][y] = sin;
                transpose[y][x] = -sin;
            }
        }
    }
    return new AsymMatrix(basis, dim, dim, transpose);
}

function randomRotate(matrix: Matrix): Matrix {
    const dim: number = matrix.height();
    const even: number = (dim % 2 === 0) ? dim : dim + 1;
    const half: number = even / 2;

    let x: number[] = [];
    let y: number[] = [];
    let z: number = even - 1;
    let planess: Plane[][] = [];
    for (let i = 1; i < half; ++i) {
        x.push(i);
        y.push(z - i);
    }
    for (let i = 0; i <= even - 2; ++i) {
        planess[i] = [{ x: 0, y: z }];
        for (let j = 0; j < x.length; ++j) {
            planess[i].push({ x: x[j], y: y[j] });
        }
        x.unshift(z);
        y.push(x.pop()!);
        z = y.shift()!;
    }

    return planess.map((planes) =>
        randomRotation(dim, ...planes)
    ).reduceRight(multMM, matrix);
}

function orthoVectors(dim: number, count: number, scale = 1): number[][] {
    const basis = standardBasis(dim, scale);
    let vectors: number[][] = [];
    while (vectors.length < count) {
        vectors = vectors.concat(randomRotate(basis).cols());
    }
    return vectors.slice(0, count);
}

export { standardBasis, randomRotation, randomRotate, orthoVectors };
