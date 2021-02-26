import _Matrix, { SymMatrix, AsymMatrix } from "./matrices/matrix";
import standardBasis from "./matrices/standard";

export type Matrix = _Matrix;
export { SymMatrix, AsymMatrix };
export {
    dot, multVV,
    multMM, multMV, multMVplusV,
    multMtV
} from "./matrices/operations";
export { standardBasis };
export {
    randomRotation, randomRotate, orthoVectors
} from "./matrices/rotations";
