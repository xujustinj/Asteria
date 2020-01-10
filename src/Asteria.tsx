import React, { Component } from "react";
import { TestableNetwork } from "./neuro/neuro";
import Test from "./Test"
import Train from "./Train";
import Table, { Row } from "./Table";

const g = 'G', r = 'R';

abstract class Asteria extends Component<{}> {
    state: { rows: Row[]; input: number; };

    constructor(props: {}) {
        super(props);
        this.state = { rows: [this.makeRow(0)], input: 0 };
    }

    protected abstract net(): TestableNetwork;

    private makeRow(key: number): Row {
        return {
            key: key,
            values: new Map([
                [g, key],
                ...this.makeRowExtras(),
                [r, this.net().r()],
            ]),
        };
    }
    protected makeRowExtras(): Map<string, number> { return new Map(); }

    private onTrain(samples: number, sensitivity: number, friction: number, generations: number) {
        for (let i = 0; i < generations; ++i) {
            this.net().study(samples);
            this.net().learn(sensitivity, friction);

            let { rows } = this.state;
            rows.unshift(this.makeRow(rows.length));
            this.setState({ rows: rows });
        }
    };

    private About(): JSX.Element {
        const AboutContents = this.AboutContents.bind(this);
        return (
          <div>
            <h2>About</h2>
            <AboutContents />
          </div>
        )
    }
    protected AboutContents(): JSX.Element { return <div />; }

    private Testing(): JSX.Element {
        const TestingContents = this.TestingContents.bind(this);
        return (
          <div>
            <h2>Testing</h2>
            <TestingContents />
            <Test network={this.net()} />
          </div>
        )
    }
    protected TestingContents(): JSX.Element { return <div />; }

    private Training(): JSX.Element {
        const { rows } = this.state;
        const TrainingContents = this.TrainingContents.bind(this);
        return (
          <div>
            <h2>Training</h2>
            <TrainingContents />
            <Train onTrain={this.onTrain.bind(this)}/>
            <Table rows={rows} />
          </div>
        )
    }
    protected TrainingContents(): JSX.Element { return <div />; }

    render() {
        const About = this.About.bind(this);
        const Testing = this.Testing.bind(this);
        const Training = this.Training.bind(this);
        return (
          <div className="Asteria42">
            <About />
            <Testing />
            <Training />
          </div>
        );
    }
}

export default Asteria;
