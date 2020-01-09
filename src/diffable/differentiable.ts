import Variable from './variable';

interface Differentiable {
    value(): number
    deriv(_v: Variable): number
    // print(): string
}

export default Differentiable;
