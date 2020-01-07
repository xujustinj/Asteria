import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Asteria42 from "./asteria42/Asteria42";
import AsteriaNAND from "./asteriaNAND/AsteriaNAND";
import AsteriaXOR from "./asteriaXOR/AsteriaXOR";

function App() {
    return (
      <Router>
        <div>
          <nav>
            [<Link to="/Asteria/42">42</Link>]
            [<Link to="/Asteria/NAND">NAND</Link>]
            [<Link to="/Asteria/XOR">XOR</Link>]
					</nav>
				</div>
        <Switch>
          <Route path="/Asteria/42">
            <Asteria42 />
          </Route>
          <Route path="/Asteria/NAND">
            <AsteriaNAND />
          </Route>
          <Route path="/Asteria/XOR">
            <AsteriaXOR />
          </Route>
        </Switch>
			</Router>
    );
}

export default App;
