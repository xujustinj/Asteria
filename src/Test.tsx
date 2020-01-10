import React, { Component } from "react";
import { TestableNetwork } from "./neuro/neuro";

type TestProps = {
    network: TestableNetwork;
}

class Test extends Component<TestProps> {
    net: TestableNetwork;
    state: {
        inputs: Map<string, number>;
        outputs: Map<string, number>;
    }

    constructor(props: TestProps) {
        super(props);

        this.net = props.network;
        const inputs = new Map(this.net.getInputLayer().get().map(
            (neuron) => [neuron.print(), 0]
        ));
        this.state = {
            inputs: inputs,
            outputs: this.net.getOutput(inputs),
        }
    }

    handleInput(event: { target: { name: string; value: any; }; }) {
        const { name, value } = event.target;
        const { inputs } = this.state;
        inputs.set(name, value);
        this.setState({ inputs: inputs, outputs: this.net.getOutput(inputs) });
    }

    render() {
      const input: string = "input";
      const output: string = "output";

      let inputsTSX: JSX.Element[] = [];
      for (const [name, value] of this.state.inputs) {
          inputsTSX.push(
            <div key={input + "-" + name}>
            <label>{name}=</label>
            <input
              type="number"
              name={name}
              value={value}
              onChange={this.handleInput.bind(this)} />
            </div>
          );
      }

      let outputsTSX: JSX.Element[] = [];
      for (const [name, value] of this.state.outputs) {
          outputsTSX.push(
            <div key={output + "-" + name}>
            <label>{name}=</label>
            <input readOnly
              type="number"
              name={name}
              value={value}/>
            </div>
          );
      }

      return (
        <form className="Test">
          <h3>Inputs</h3>
          {inputsTSX}
          <h3>Outputs</h3>
          {outputsTSX}
        </form>
      );
    }
}

export default Test;
