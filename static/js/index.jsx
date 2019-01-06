import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";

import React from "react";
import ReactDOM from "react-dom";

import Header from "./header";
import LEDcontrol from "./LEDcontroller.jsx";

const api = location.hostname == "localhost" ? "http://stadlerpi.home" : document.location.href;

console.log(api);

class App extends React.Component {
	render() {
		return (
			<div>
			<Header />
			<LEDcontrol api={this.props.api} />
			</div>
		);
	}
}

ReactDOM.render(<App api={api} />, document.getElementById("main"));
