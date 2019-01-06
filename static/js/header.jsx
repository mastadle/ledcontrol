import React from "react";
import {
	Collapse,
	Navbar,
	NavItem,
	NavLink,
	Nav
} from "reactstrap";

export default class Header extends React.Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
		};
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<div>
				<Navbar color="secondary" dark expand="md" className="mb-4">
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="/wake">Wake</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/sleep">Sleep</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}
