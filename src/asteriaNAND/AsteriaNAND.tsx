import React, { Component } from "react";
import Table, { TableRow } from "./Table";
import Form, { FormState } from "../Form";
import NetworkNAND from "./NetworkNAND";

class AsteriaNAND extends Component<{}> {
    net: NetworkNAND;

    state: { data: TableRow[]; x: 0, y: 0 };

    constructor(props: {}) {
        super(props);

        this.net = new NetworkNAND();
        console.log(this.net.printErr());

        this.state = { data: [{ r: undefined }], x: 0, y: 0 };
    }

    train(samples: number, sensitivity: number) {
        let rsq = 0;
        for (let i = 0; i < samples; ++i) {
            this.net.study();
            rsq += this.net.valueErr();
        }
        let { data } = this.state;
        data[data.length - 1].r = Math.sqrt(rsq / samples);
        this.net.learn(sensitivity);
        data.push({ r: undefined });
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
        const { data, x, y } = this.state;

        let output: number = NaN;
        if (isFinite(x) && isFinite(y)) {
            output = this.net.value(x, y);
        }

        return (
          <div className="Asteria42">
            <label>x</label>
            <input
              type="number"
              name="x"
              value={x}
              onChange={this.handleChange} />
            <br />
            <label>y</label>
            <input
              type="number"
              name="y"
              value={y}
              onChange={this.handleChange} />
            <br />
            <label>Output</label>
            <input readOnly
              type="text"
              name="output"
              value={output} />

            <h2>Training</h2>
            <Form handleSubmit={this.handleSubmit} />
            <Table data={data} />
          </div>
        );
    }
}

export default AsteriaNAND;
