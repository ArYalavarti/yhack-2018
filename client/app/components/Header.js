import React, { Component } from "react";
import { Menu, Icon } from "semantic-ui-react";

import logo from "./../../public/assets/Images/logo.png";
import "../../public/assets/Main.css";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="navbar">
        <Menu secondary>
          <Menu.Menu position="left">
            <img src={logo} className="logo" alt="logo" />
          </Menu.Menu>

          <Menu.Menu position="right">
          </Menu.Menu>
        </Menu>
        <div className="ui divider" />
      </div>
    );
  }
}

export default Header;
