import React from "react";
import axios from "axios";
import buildUrl from "build-url";

export default class LEDcontrol extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			keys: []
		};

		this.sendKey = this.sendKey.bind(this);
	}

	componentDidMount() {
		axios.get(
			buildUrl(this.props.api, { path: "keys" })
		).then(
			response => this.setState({ keys: response.data})
		);
	}

	sendKey(key_name) {
		if (key_name != null) {
			axios.post(this.props.api, {
				key: key_name
			});
		}
	}

	render() {
		// console.log(this.state.keys);
		const key_gen = this.state.keys.map(key => (
			<div key={key.id}>
				<button onClick={(ev) => this.sendKey(key.name)}>{key.name}</button>
			</div>
		));

		return (
			<div className="container">
				<div className="row-3">
					{key_gen}
				</div>
			</div>
		);
	}
}
