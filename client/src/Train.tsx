import React, { Component } from "react";

type TrainProps = {
    onTrain: (
        samples: number,
        sensitivity: number,
        friction: number,
        generations: number
    ) => void;
};

class Train extends Component<TrainProps> {
    state: {
        samples: number;
        sensitivity: number;
        friction: number;
        generations: number;
    };

    constructor(props: TrainProps) {
        super(props);
        this.state = {
            samples: 1,
            sensitivity: 1,
            friction: 1,
            generations: 1,
        };
    }

    handleChange(event: { target: { name: string; value: any; }; }) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    submitForm() {
        const { samples, sensitivity, friction, generations, } = this.state;
        this.props.onTrain(samples, sensitivity, friction, generations);
    }

    render() {
        const { samples, sensitivity, friction, generations, } = this.state;
        return (
          <form className="Train">
            <label>Samples</label>
            <input
              type="number"
              name="samples"
              value={isFinite(samples) ? samples : ""}
              min="1"
              onChange={this.handleChange.bind(this)} />
            <br />

            <label>Sensitivity</label>
            <input
              type="number"
              name="sensitivity"
              value={isFinite(sensitivity) ? sensitivity : ""}
              onChange={this.handleChange.bind(this)} />
            <br />

            <label>Friction</label>
            <input
              type="number"
              name="friction"
              value={isFinite(friction) ? friction : ""}
              onChange={this.handleChange.bind(this)} />
            <br />

            <label>Generations</label>
            <input
              type="number"
              name="generations"
              value={isFinite(generations) ? generations : ""}
              min="0"
              onChange={this.handleChange.bind(this)} />
            <br />

            <input
              type="button"
              value="Train"
              onClick={this.submitForm.bind(this)} />
          </form>
        );
    }
}

export default Train;
