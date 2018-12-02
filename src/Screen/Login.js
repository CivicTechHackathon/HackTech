import React, { Component } from "react";

import fire from "../config/fire";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }
  render() {
    return (
      <div className="App">
        <h1>Hello World</h1>
        {this.renderForm()}
      </div>
    );
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        let email = user.email;
        if (email === "admin@gmail.com") {
          console.log("UserEmail===>", user.email);
          this.props.history.replace("/panel");
        }

        if (email === "police@gmail.com") {
          console.log("UserEmail===>", user.email);
          this.props.history.replace("/PolicePanel");
        }

        // User is signed in.
      } else {
        console.log("not logged in");

        // No user is signed in.
      }
    });
  }

  renderForm = () => {
    return (
      <div className="col-lg-12 d-flex justify-content-center">
        <form>
          <div className="invisible">...</div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              onChange={e => this.setState({ email: e.target.value })}
              className="form-control"
              placeholder="Enter email"
            />
            <small className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
              className="form-control"
              placeholder="Password"
            />
          </div>

          <button
            type="button"
            onClick={this.login}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  };

  login = () => {
    const { email, password } = this.state;
    if (email && password) {
      fire
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          if (email === "admin@gmail.com") {
            console.log("UserEmail===>", email);
            this.props.history.replace("/panel");
          }

          if (email === "police@gmail.com") {
            console.log("UserEmail===>", email);
            this.props.history.replace("/PolicePanel");
          }

          console.log("Signed in successfully");
        })
        .catch(function(error) {
          // Handle Errors here.
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // ...
        });
    } else {
      alert("Fill out all fields");
    }
  };
}

export default Login;
