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

	getName(key) {
		if (key.name.substring(0,2) == "BR") {
			return key.name.substring(10).toLowerCase()
		} else {
			return key.name.toLowerCase()
		}
	}

	render() {
		// console.log(this.state.keys);
		const key_gen = this.state.keys.map(key => (
			<button  key={key.id}
				type="button" className="btn btn-dark col-md-2 ml-4 mb-3"
				onClick={(ev) => this.sendKey(key.name)}>
				{this.getName(key)}
			</button>
		));

		return (
			<div className="container">
				<div className="row col-md-10">
					{key_gen}
				</div>
			</div>
		);
	}
}
