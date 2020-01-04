import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Asteria42 from "./asteria42/Asteria42";

function App() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/Asteria/Asteria42"><h1>Asteria42</h1></Link>
					</nav>
				</div>
        <Switch>
          <Route path="/Asteria/Asteria42">
            <Asteria42 />
          </Route>
        </Switch>
			</Router>
    );
}

export default App;
