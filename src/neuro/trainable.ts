import { Differentiable } from "../diffable/diffable";

interface Trainable {
    study(error: Differentiable): void;
    learn(sensitivity: number): void;
}

export default Trainable;
