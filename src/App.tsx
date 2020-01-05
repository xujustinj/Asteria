import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Asteria42 from "./asteria42/Asteria42";
import AsteriaNAND from "./asteriaNAND/AsteriaNAND";

function App() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/Asteria/Asteria42"><h1>Asteria42</h1></Link>
            <Link to="/Asteria/AsteriaNAND"><h1>AsteriaNAND</h1></Link>
					</nav>
				</div>
        <Switch>
          <Route path="/Asteria/Asteria42">
            <Asteria42 />
          </Route>
          <Route path="/Asteria/AsteriaNAND">
            <AsteriaNAND />
          </Route>
        </Switch>
			</Router>
    );
}

export default App;
