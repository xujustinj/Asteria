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
