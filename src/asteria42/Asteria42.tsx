import React from "react";
import Asteria from "../Asteria";
import Network42 from "./Network42";

const m = 'm', b = 'b';

class Asteria42 extends Asteria {
    private _net: Network42 | undefined = undefined;
    protected net() {
        if (!this._net) { this._net = new Network42(); }
        return this._net!;
    }

    protected makeRowExtras() {
        return new Map([
            [m, this.net().m()],
            [b, this.net().b()],
        ]);
    }

    protected AboutContents() {
        return (
          <p>Asteria wants to learn the answer to life, the universe, and everything, but she needs your help!<br />
          Asteria is the simplest possible neural network: a single input neuron linked to a single output neuron.<br />
          The full equation for Asteria is y=ReLU(mx+b). Her initial state is y=ReLU(x), where m=1.<br />
          Asteria will be trained to minimize R^2, the mean of (y-42)^2 over randomly-sampled values of x ranging from 0 to 1.</p>
        )
    }
    protected TestingContents() {
        return (
          <p>Asteria should output 42 no matter what input we give her.</p>
        )
    }
    protected TrainingContents() {
        return (
          <p>We want Asteria to reach y=42~ReLU(42), where m=0 and b~42.<br />
            To adjust m and b, Asteria samples values of x between 0 to 1 and does fancy backpropagation.</p>
        )
    }
}

export default Asteria42;
