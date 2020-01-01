import React, { Component } from 'react';

export type FormProps = {
    handleSubmit: (state: { samples: number; sensitivity: number; }) => void;
}

class Form extends Component<FormProps> {
    state: { samples: number; sensitivity: number; };
    handleSubmit: (state: { samples: number; sensitivity: number; }) => void;

    constructor(props: FormProps) {
        super(props);

        this.state = { samples: NaN, sensitivity: NaN };
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
        const { samples, sensitivity } = this.state;

        return (
            <form>
                <label>Samples</label>
                <input
                    type="number"
                    name="samples"
                    value={samples}
                    min="1"
                    onChange={this.handleChange} />
                <br />
                <label>Sensitivity</label>
                <input
                    type="number"
                    name="sensitivity"
                    value={sensitivity}
                    onChange={this.handleChange} />
                <br />
                <input type="button" value="Submit" onClick={this.submitForm} />
            </form>
        );
    }
}

export default Form;
