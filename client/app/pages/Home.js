import React, { Component } from "react";
import { Grid, Form, Input, Icon } from "semantic-ui-react";

import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Calendar from "./../components/Calendar";
import DynamicGraph from "./../components/DynamicGraph";

import "../../public/assets/Main.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, 300);
  }

  render() {
    return (
      <div className="homePage">
        {this.state.loaded ? (
          <div className="homePageContainer">
            <Header />
            <Grid doubling columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Calendar />
                </Grid.Column>
                <Grid.Column>
                  <DynamicGraph />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Footer />
          </div>
        ) : (
          <div className="loading">Loading...</div>
        )}
      </div>
    );
  }
}

export default Home;
