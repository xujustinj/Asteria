import { SymMatrix } from "./matrix";

function standardBasis(dim: number, scale: number = 1): SymMatrix {
    let basis: number[][] = new Array(dim);
    for (let i = 0; i < dim; ++i) {
        basis[i] = new Array(dim).fill(0);
        basis[i][i] = scale;
    }
    return new SymMatrix(basis, dim);
}

export default standardBasis;
