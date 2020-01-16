import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import Welcome from "./Welcome";
import Asteria42 from "./asteria42/Asteria42";
import AsteriaNAND from "./asteriaNAND/AsteriaNAND";
import AsteriaXOR from "./asteriaXOR/AsteriaXOR";

const asteria = "/Asteria"

function App() {
    return (
      <Router>
        <header>
          <nav>
            [<Link to={`${asteria}/42`}>42</Link>]
            [<Link to={`${asteria}/NAND`}>NAND</Link>]
            [<Link to={`${asteria}/XOR`}>XOR</Link>]
          </nav>
		</header>
        <Switch>
          <Redirect exact from={asteria} to={`${asteria}/welcome`} />
          <Route path={`${asteria}/welcome`}>
            <Welcome />
          </Route>
          <Route path={`${asteria}/42`}>
            <Asteria42 />
          </Route>
          <Route path={`${asteria}/NAND`}>
            <AsteriaNAND />
          </Route>
          <Route path={`${asteria}/XOR`}>
            <AsteriaXOR />
          </Route>
        </Switch>
	  </Router>
    );
}

export default App;
