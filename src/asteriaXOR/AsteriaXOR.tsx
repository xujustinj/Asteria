import Asteria from "../Asteria";
import NetworkXOR from "./NetworkXOR";

class AsteriaXOR extends Asteria {
    private _net: NetworkXOR | undefined = undefined;
    protected net() {
        if (!this._net) { this._net = new NetworkXOR(); }
        return this._net!;
    }
}

export default AsteriaXOR;
