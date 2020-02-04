import React, { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {
    Button,
    Container,
    Image,
    Menu,
    Segment,
    Sidebar
} from 'semantic-ui-react';
import './stylesheets/adventure.css';
import './stylesheets/layout.css';
import githubImage from './img/github-logo-and-text.png';
import Asteria42 from "./asteria42/Asteria42";
import AsteriaXOR from "./asteriaXOR/AsteriaXOR";
import AsteriaNAND from "./asteriaNAND/AsteriaNAND";

type AsteriaRoute = {
  name: string;
  path: string;
  inLeftbar: boolean;
  heading: string;
  main: () => JSX.Element;
}
const asteria = "/Asteria/";
const routes = [
    {
        name: "Home",
        path: asteria,
        inLeftbar: true,
        heading: "Welcome",
        main: () => <Welcome />
    },
    {
        name: "The Answer",
        path: asteria + "42",
        inLeftbar: true,
        heading: "The Answer",
        main: () => <Asteria42 />
    },
    {
        name: "NAND Logic",
        path: asteria + "NAND",
        inLeftbar: true,
        heading: "NAND Logic",
        main: () => <AsteriaNAND />
    },
    {
        name: "Exclusive OR",
        path: asteria + "XOR",
        inLeftbar: true,
        heading: "Exclusive OR",
        main: () => <AsteriaXOR />
    }
];

type LeftbarProps = {
    visible: boolean;
    routes: AsteriaRoute[];
}
const Leftbar = ({ visible, routes }: LeftbarProps) => (
    <Sidebar
      as={Menu}
      animation="overlay"
      direction="left"
      icon='labeled'
      inverted
      vertical
      visible={visible}
      width="thin"
    >
      <Switch>
        {routes.map((route, i) => (
          <Route exact
            key={i}
            path={route.path}>
            {routes.filter(({ inLeftbar }) => inLeftbar).map((route, j) => (
                <Menu.Item as={Link} className="adventure-on-hover"
                  key={i + '-' + j}
                  to={route.path}
                  active={i === j}>
                  {route.name}
                </Menu.Item>
            ))}
          </Route>
        ))}
      </Switch>
      <Menu.Item>
        <p>Created by<br/>Justin Xu</p>
        <Button as='a' className='github'
          href='https://github.com/xujustinj/Asteria'
        >
          <Image src={githubImage}/>
        </Button>
      </Menu.Item>
    </Sidebar>
)

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
      </div>
    )
}

function App() {
    const [leftbar, setLeftbar] = useState(false);

    return (
      <Router>
        <header>
          <div className="logo"
            onClick={() => setLeftbar(true)}
            onMouseOver={() => setLeftbar(true)}>
              <h1 className="adventure-on-hover">Asteria</h1>
          </div>
          <Switch>
            {routes.map((route, index) => (
              <Route exact
                key={index}
                path={route.path}>
                <h2 className="heading adventure-on-hover">{route.heading}</h2>
              </Route>
            ))}
          </Switch>
        </header>
          <Sidebar.Pushable as={Segment} className="rest">
            <Leftbar visible={leftbar} routes={routes}/>
            <Sidebar.Pusher
              dimmed={leftbar}
              onClick={() => setLeftbar(false)}>
              <div className="content">
                <Container text>
                  {routes.map((route, index) =>
                    <Route exact
                      key={index}
                      path={route.path}>
                      <route.main />
                    </Route>
                  )}
                </Container>
              </div>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
      </Router>
    );
}

export default App;
