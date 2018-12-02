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
            <Menu.Item>
              <Icon className="nav-button" size="large" name="info circle" />
            </Menu.Item>

            <Menu.Item>
              <Icon
                className="nav-button"
                size="large"
                name="users"
              />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <div className="ui divider" />
      </div>
    );
  }
}

export default Header;
