import React, { Component } from "react";
import { Grid, Card, Input, Icon, Button } from "semantic-ui-react";
import "whatwg-fetch";

import { getFromStorage, setInStorage } from "./../utils/storage.js";
import { initializeData } from "./../utils/utils.js";
import Modal from "react-responsive-modal";

import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Calendar from "./../components/Calendar";
import LoadingScreen from "react-loading-screen";

import "../../public/assets/Main.css";
import logo from "./../../public/assets/Images/logo.png";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
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
    this.logout = this.logout.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");

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
      isLoading: true,
      show: false,
      signInError: "",
      signUpError: ""
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
  openModal() {
    this.setState({ show: true });
  }

  closeModal() {
    this.setState({ show: false });
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
          <LoadingScreen
            loading={isLoading}
            className="loading"
            bgColor="#f1f1f1"
            spinnerColor="hsl(212, 100%, 50%)"
            textColor="#676767"
          >
            <Header />

            <div className="homePageContainer">
              <Grid padded centered>
                <img src={logo} className="logoMedium" />

                <Grid.Row>
                  <div className="loginForm">
                    {signInError ? <p>{signInError}</p> : null}
                    <h2 className="">Sign In</h2>
                    <br />
                    <Input
                      type="email"
                      placeholder="Username"
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
              </Grid>

              <Button onClick={this.openModal}>Sign Up</Button>

              <Modal
                className="heroModal"
                open={this.state.show}
                onClose={this.closeModal}
                center
              >
                <h2 className="modalHeading">Get started!</h2>
                <div className="modalBody">
                  <p> </p>
                  <div className="loginForm">
                    {signUpError ? <p>{signUpError}</p> : null}
                    <h3 className="">
                      Sign up with your email and get started <br /> using Mood
                      Pro!
                    </h3>
                    <br />
                    <Input
                      type="email"
                      placeholder="Username"
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
                    <Button onClick={this.onSignUp}>Sign Up!</Button>
                  </div>
                </div>
              </Modal>
            </div>
            <Footer />
          </LoadingScreen>
        </div>
      );
    }

    return (
      <div className="homePageContainer">
        <Header />
        <Calendar data={data} email={signInEmail} />
        <div className="logout-row">
            <Button onClick={this.logout}>Logout</Button>
        </div>

        <Footer />
      </div>
    );
  }
}

export default Home;
