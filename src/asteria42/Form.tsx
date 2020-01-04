import React, { Component } from "react";

export type FormState = {
    samples: number;
    sensitivity: number;
    generations: number;
};

export type FormProps = {
    handleSubmit: (state: FormState) => void;
};

class Form extends Component<FormProps> {
    state: FormState;
    handleSubmit: (state: FormState) => void;

    constructor(props: FormProps) {
        super(props);
        this.state = { samples: 1, sensitivity: 1, generations: 1 };
        this.handleSubmit = (props as any).handleSubmit;
    }

    handleChange = (event: { target: { name: any; value: any; }; }) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    submitForm = () => {
        (this.props as any).handleSubmit(this.state)
    }

    render() {
        const { samples, sensitivity, generations } = this.state;
        return (
          <form>
            <label>Samples</label>
            <input
              type="number"
              name="samples"
              value={isFinite(samples) ? samples : ""}
              min="1"
              onChange={this.handleChange} />
            <br />

            <label>Sensitivity</label>
            <input
              type="number"
              name="sensitivity"
              value={isFinite(sensitivity) ? sensitivity : ""}
              onChange={this.handleChange} />
            <br />

            <label>Generations</label>
            <input
              type="number"
              name="generations"
              value={isFinite(generations) ? generations : ""}
              min="0"
              onChange={this.handleChange} />
            <br />

            <input type="button" value="Train" onClick={this.submitForm} />
          </form>
        );
    }
}

export default Form;
