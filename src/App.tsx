import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './stylesheets/adventure.css';
import './stylesheets/header.css';
import './stylesheets/content.css';
import './stylesheets/sidebar.css';
import Asteria42 from "./asteria42/Asteria42";
import AsteriaXOR from "./asteriaXOR/AsteriaXOR";
import AsteriaNAND from "./asteriaNAND/AsteriaNAND";

const asteria = "/Asteria/";

const routes = [
    {
        name: "Home",
        heading: () => (
          <h1 className="heading">Welcome</h1>
        ),
        path: asteria,
        inSidebar: false,
        main: () => <Welcome />
    },
    {
        name: "The Answer",
        path: asteria + "42",
        inSidebar: true,
        heading: () => (
          <h1 className="heading">The Answer</h1>
        ),
        main: () => <Asteria42 />
    },
    {
        name: "NAND Logic",
        path: asteria + "NAND",
        inSidebar: true,
        heading: () => (
          <h1 className="heading">NAND Logic</h1>
        ),
        main: () => <AsteriaNAND />
    },
    {
        name: "Exclusive OR",
        path: asteria + "XOR",
        inSidebar: true,
        heading: () => (
          <h2 className="heading adventure-on-hover">Exclusive OR</h2>
        ),
        main: () => <AsteriaXOR />
    }
];

function Welcome() {
    return (
      <div>
        <h3>What</h3>
        <p>Asteria is the product of a ongoing adventure into the world of machine learning. The goal: to have a tool that can identify and translate <a href="https://madeon.fandom.com/wiki/Adventure_alphabet">Madeon's Adventure alphabet</a> on the fly (hence the name Asteria). By no means is Asteria anywhere near that goal, nor am I making a direct beeline for it. I'm taking a winding path that will hopefully maximize the amount I can learn from this project.</p>
        <p>In the sidebar are 3 small-scale demonstrations of Asteria's learning power that probably won't melt your CPUs. Enjoy!</p>

        <h3>How</h3>
        <p>So far, I have:</p>
        <ul>
          <li>built an <b>object-oriented multilayer perceptron</b> library</li>
          <li>implemented <b>symbolic differentiation</b> (deprecated) in <b>TypeScript</b></li>
          <li>re-derived the matrix shortcuts for computing <b>backpropagation</b> and implemented them in <b>TypeScript</b></li>
          <li>added <b>momentum</b> and <b>orthogonal initialization</b> to speed up learning</li>
          <li>built this website with <b>React</b> and <b>React Router</b></li>
          <li>re-learned <b>CSS</b> via <b>SASS (scss)</b></li>
        </ul>

        <h3>Who</h3>
        <p>Special thanks to:</p>
        <ul>
          <li><b>Grant Sanderson (3Blue1Brown)</b> for making the <a href="https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi">videos</a> that kicked off this adventure</li>
          <li><b>TwoNineFive</b> for the putting together the <a href="https://fontmeme.com/fonts/madeon-runes-font/">lovely font</a> that's dotted around this site</li>
        </ul>

        <h3>Why</h3>
        <p>If you're wondering why I implemented machine learning in JavaScript... why not?</p>

        <div className="signoff adventure-off-hover">Justin</div>
      </div>
    )
}

function App() {
    return (
      <Router>
        <header>
          <div className="sidebar-width logo-container">
            <Link to="/Asteria/" className="adventure-on-hover">Asteria</Link>
          </div>
          <Switch>
            {routes.map((route, index) => (
              <Route exact
                key={index}
                path={route.path}>
                <route.heading />
              </Route>
            ))}
          </Switch>
          <a className="github-button" href="https://github.com/xujustinj/Asteria">GitHub</a>
        </header>
        <div className="main">
          <div className="sidebar">
            {routes.filter(({ inSidebar }) =>
                inSidebar
            ).map((route, index) =>
                <Link
                  key={index}
                  to={route.path}
                  className="adventure-on-hover">
                  {route.name}
                </Link>
            )}
          </div>
          <div className="content">
            {routes.map((route, index) =>
              <Route exact
                key={index}
                path={route.path}>
                <route.main />
              </Route>
            )}
          </div>
        </div>
      </Router>
    );
}

export default App;
