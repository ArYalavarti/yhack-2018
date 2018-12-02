import React, { Component } from "react";
import { Grid, Form, Input, Icon, Button } from "semantic-ui-react";
import "whatwg-fetch";

import { getFromStorage, setInStorage } from "./../utils/storage.js";
import { initializeData } from "./../utils/utils.js";

import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Calendar from "./../components/Calendar";
import DynamicGraph from "./../components/DynamicGraph";
import LoadingScreen from "react-loading-screen";

import "../../public/assets/Main.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      token: "",
      signUpError: "",
      signInError: "",
      signInEmail: "",
      signInPassword: "",
      signUpEmail: "",
      signUpPassword: ""
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(
      this
    );
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(
      this
    );
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(
      this
    );
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
      this
    );

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    console.log(obj);
    if (obj && obj.token && obj.data) {
      const { token } = obj;
      // Verify token
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false,
              data: obj.data,
              signInEmail: obj.email
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  initializeAllData() {
    var out = [];

    for (var i = 0; i < 4; i++) {
      out.push(initializeData(2018 + i));
    }
    console.log(out);
    return out;
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }

  onSignUp() {
    // Grab state
    const { signUpEmail, signUpPassword } = this.state;

    this.setState({
      isLoading: true
    });

    // Post request to backend
    fetch("/api/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
        moodData: this.initializeAllData()
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: "",
            signUpPassword: ""
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }
      });
  }

  onSignIn() {
    // Grab state
    const { signInEmail, signInPassword } = this.state;

    this.setState({
      isLoading: true
    });

    // Post request to backend
    fetch("/api/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          setInStorage("the_main_app", {
            token: json.token,
            data: json.data,
            email: signInEmail
          });
          setTimeout(() => {
            this.setState({
              signInError: "",
              isLoading: false,
              signInPassword: "",
              signInEmail: signInEmail,
              token: json.token,
              data: json.data
            });
          }, 0);
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("/api/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          setTimeout(() => {
            if (json.success) {
              this.setState({
                token: "",
                isLoading: false,
                data: [],
                email: null
              });
            } else {
              this.setState({
                isLoading: false
              });
            }
          }, 3000);
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
      data
    } = this.state;

    if (!token || (!data && !token) || isLoading) {
      return (
        <div>
          <Header />
          <LoadingScreen
            loading={isLoading}
            bgColor="#f1f1f1"
            spinnerColor="coral"
            textColor="#676767"
          />
          <div className="homePageContainer">
            <Grid padded centered>
              <Grid.Row>
                <div className="loginForm">
                  {signInError ? <p>{signInError}</p> : null}
                  <h2 className="selectUnderline">Sign In</h2>
                  <br />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={signInEmail}
                    onChange={this.onTextboxChangeSignInEmail}
                  />
                  <br />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={signInPassword}
                    onChange={this.onTextboxChangeSignInPassword}
                  />
                  <br /> <br />
                  <Button onClick={this.onSignIn}>Sign In</Button>
                </div>
              </Grid.Row>

              <Grid.Row>
                <div className="loginForm">
                  {signUpError ? <p>{signUpError}</p> : null}
                  <h2 className="selectUnderline">Sign Up</h2>
                  <br />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={signUpEmail}
                    onChange={this.onTextboxChangeSignUpEmail}
                  />
                  <br />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={signUpPassword}
                    onChange={this.onTextboxChangeSignUpPassword}
                  />
                  <br />
                  <br />
                  <Button onClick={this.onSignUp}>Sign Up</Button>
                </div>
              </Grid.Row>
            </Grid>
          </div>
          <Footer />
        </div>
      );
    }

    return (
      <div className="homePageContainer">
        <Header />
        <Grid doubling columns={2} divided>
          <Grid.Row>
            <Grid.Column>
              <Calendar data={data} email={signInEmail} />
            </Grid.Column>
            <Grid.Column>
              <DynamicGraph />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <div className="logout-row">
              <Button onClick={this.logout}>Logout</Button>
            </div>
          </Grid.Row>
        </Grid>
        <Footer />
      </div>
    );
  }
}

export default Home;
