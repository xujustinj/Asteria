import React, { Component } from "react";
import Table, { TableRow } from "./Table";
import Form, { FormState } from "./Form";
import Network42 from "./Network42";

class Asteria42 extends Component<{}> {
    net: Network42;

    state: { data: TableRow[]; input: number };

    constructor(props: {}) {
        super(props);

        this.net = new Network42();
        this.state = { data: [{ m: 1, b: 0, r: undefined }], input: 0 };
    }

    train(samples: number, sensitivity: number) {
        let rsq = 0;
        for (let i = 0; i < samples; ++i) {
            this.net.study();
            rsq += this.net.rsq();
        }
        let { data } = this.state;
        data[data.length - 1].r = Math.sqrt(rsq / samples);
        this.net.learn(sensitivity);
        data.push({ m: this.net.m(), b: this.net.b(), r: undefined });
        this.setState({ data: data });
    }

    handleChange = (event: { target: { name: any; value: any }; }) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (state: FormState) => {
        for (let i: number = 0; i < state.generations; ++i) {
            this.train(state.samples, state.sensitivity);
        }
    };

    render() {
        const { data, input } = this.state;

        let output: number = NaN;
        if (isFinite(input)) {
            output = this.net.value(input);
        }

        return (
          <div className="Asteria42">
            <h2>About</h2>
            <p>Asteria wants to learn the answer to life, the universe, and everything, but she needs your help!<br />
            Asteria is the simplest possible neural network: a single input neuron linked to a single output neuron.<br />
            She has no hidden layers, so Asteria is really just a linear relation passed through an activation function (softplus).<br />
            The full equation for Asteria is y=ReLU(mx+b). Her initial state is y=ReLU(x), where m=1 and b=0.<br />
            Asteria will be trained to minimize R^2, the mean of (y-42)^2 over randomly-sampled values of x ranging from 0 to 1.</p>

            <h2>Testing</h2>
            <p>If she has learned well, Asteria should output 42 no matter what input we give her. Test it out here!</p>
            <label>Input</label>
            <input
              type="number"
              name="input"
              value={input}
              onChange={this.handleChange} />
            <br />
            <label>Output</label>
            <input readOnly
              type="text"
              name="output"
              value={output} />

            <h2>Training</h2>
            <p>We want Asteria to ultimately settle on y=42~ReLU(42), where m=0 and b=42.<br />
            To determine how to adjust m and b, Asteria samples values of x between 0 to 1 (you decide how many) and does fancy backpropagation.<br />
            Sensitivity determines the strength of the adjustments to m and b in each generation of Asteria.<br />
            If sensitivity is negative, Asteria will try to maximize error instead of minimizing it.<br />
            If sensitivity is too large (the upper bound is around 0.75), Asteria will overshoot on her adjustments and fail to settle anywhere.</p>
            <Form handleSubmit={this.handleSubmit} />
            <Table data={data} />
          </div>
        );
    }
}

export default Asteria42;