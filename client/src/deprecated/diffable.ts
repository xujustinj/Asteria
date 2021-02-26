import _Differentiable from "./diffable/differentiable";
import Expression, {
    ExprUnary, ExprBinary, ExprVariadic
} from "./diffable/expression";
import Variable from "./diffable/variable";

export type Differentiable = _Differentiable;
export { Expression, ExprUnary, ExprBinary, ExprVariadic };
export { Variable };
export { BinProduct, VarSum } from "./diffable/operations";
