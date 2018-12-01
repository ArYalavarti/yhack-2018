import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import "./../assets/Main.css";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="mainContainer">
        <Grid>
          <Row className="show-grid">
            <Col sm={12} md={12}>
              Calendar!
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Calendar;
