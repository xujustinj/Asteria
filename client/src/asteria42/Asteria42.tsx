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
}

export default Asteria42;
