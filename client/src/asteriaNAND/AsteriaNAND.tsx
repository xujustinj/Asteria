import Asteria from "../Asteria";
import NetworkNAND from "./NetworkNAND";

class AsteriaNAND extends Asteria {
    private _net: NetworkNAND | undefined = undefined;
    protected net() {
        if (!this._net) { this._net = new NetworkNAND(); }
        return this._net!;
    }
}

export default AsteriaNAND;
