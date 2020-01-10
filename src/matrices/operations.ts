import Matrix, { AsymMatrix } from "./matrix";

function dotProduct(u: number[], v: number[]): number {
  return u.reduce((acc, n, i) => acc + n * v[i], 0);
}
function matrixProduct(a: Matrix, b: Matrix): AsymMatrix {
    return new AsymMatrix(a.rows().map((row) =>
        b.cols().map((col) =>
            dotProduct(row, col)
        )
    ), a.height(), b.width());
}

export { dotProduct, matrixProduct };
