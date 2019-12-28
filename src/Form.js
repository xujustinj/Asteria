import React, { Component } from 'react';

class Form extends Component {
    constructor(props) {
        super(props);

        this.state = { samples: "", sensitivity: "" };
    }

    handleChange = event => {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    submitForm = () => {
        this.props.handleSubmit(this.state)
    }

    render() {
        const { samples, sensitivity } = this.state;

        return (
            <form>
                <label> Samples </label>
                <input
                    type="number"
                    name="samples"
                    value={samples}
                    min="1"
                    onChange={this.handleChange} />
                <br />
                <label> Sensitivity </label>
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
