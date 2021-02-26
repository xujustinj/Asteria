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

import Welcome from './Welcome';
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

const App = () => {
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
