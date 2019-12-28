import React, { Component } from 'react';
import Table from './Table.js';
import Form from './Form.js';
import * as Diff from './diffable/diffable.js';

class App extends Component {
    constructor() {
        super();

        this.x = new Diff.Variable('x', 0);
        this.m = new Diff.Variable('m', 1);
        this.b = new Diff.Variable('b', 0);
        this.e = new Diff.Variable("expect", 42);

        this.expressions = [];
        this.expressions[0] = new Diff.BinaryProduct(this.m, this.x);
        this.expressions[1] = new Diff.Sum(this.expressions[0], this.b);

        this.y = new Diff.Softplus(this.expressions[1]);
        this.expressions[2] = this.y;

        this.r = new Diff.SquaredError(this.y, this.e);
        this.expressions[3] = this.r;

        this.state = { data: [{ m: 1, b: 0, r: "" }], input: 0 };
    }

    train(samples, sensitivity) {
        if (!isFinite(samples)) { return; }
        if (!isFinite(sensitivity)) { return; }
        if (samples <= 0) { return; }

        let { data } = this.state;
        let { m, b } = data[data.length - 1];

        this.m.bind(m);
        this.b.bind(b);

        let sumM = 0;
        let sumB = 0;
        let sumR = 0;
        for (let i = 0; i < samples; ++i) {
            this.x.bind(Math.random());
            sumM += this.r.deriv('m');
            sumB += this.r.deriv('b');
            sumR += this.r.value();

            this.expressions.forEach((expr) => { expr.reset(); });
        }

        m -= sumM * sensitivity / samples;
        b -= sumB * sensitivity / samples;

        data[data.length - 1].r = Math.sqrt(sumR / samples);
        data.push({ m: m, b: b, r: "" });
        this.setState({ data: data });
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    render() {
        let { data } = this.state;
        let { m, b } = data[data.length - 1];

        this.m.bind(m);
        this.b.bind(b);

        let { input } = this.state;

        let output = "";
        if (isFinite(input)) {
            this.x.bind(input);
            output = this.y.value();
        }

        this.expressions.forEach((expr) => { expr.reset(); });

        return (
            <div className="App">
                <header className="App-header">
                    <h1>Asteria</h1>
                    <p>Asteria wants to learn the answer to life, the universe, and everything, but she needs your help!</p>
                </header>

                <h2>About</h2>
                <p>Asteria is the simplest possible neural network: a single input neuron linked to a single output neuron.<br />
                She has no hidden layers, so Asteria is really just a linear relation passed through an activation function (softplus).<br />
                The full equation for Asteria is y=ReLU(mx+b). Her initial state is y=ReLU(x), where m=1 and b=0.<br />
                Asteria will be trained to minimize R^2, the mean of (y-42)^2 over randomly-sampled values of x ranging from 0 to 1.<br /></p>

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
                <Form handleSubmit={(state) => {
                    this.train(state.samples, state.sensitivity);
                }} />
                <Table data={data} />
            </div>
        );
    }
}

export default App;
