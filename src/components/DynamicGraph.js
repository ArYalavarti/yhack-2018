import React, { Component } from "react";
import { Grid, Form, Input, Icon } from "semantic-ui-react";

import "./../assets/Main.css";

class DynamicGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="mainContainer">
        <Icon link size="massive" name="users" />
      </div>
    );
  }
}

export default DynamicGraph;
