import { Differentiable } from "../diffable/diffable";

interface Trainable {
    study(error: Differentiable): void;
    learn(sensitivity: number, friction: number): void;
}

export default Trainable;
