import { Differentiable } from "../diffable/diffable";

interface Trainable {
    value(): number;
    get(): Differentiable;
    print(): string;

    study(error: Differentiable): void;
    learn(sensitivity: number): void;
}

export default Trainable;
