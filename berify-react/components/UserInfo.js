import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser, loginUser } from "../redux/actions/auth_actions";
import { Divider, Icon, Button, Input } from "antd";
import { Router } from "../routes";
import axios from "axios";
import Web3 from "web3";

class PlayerInfo extends Component {
  state = {
    dcBalance: "0",
    ethBalance: "0",
    value: 0,
    expand: false,
    email: "",
    password: "",
    loading: false
  };

  submit = async () => {
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user, () => Router.pushRoute("/inks"));
  };

  renderNotLoggedIn() {
    return (
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          <h2> Log In </h2>
          <Input
            style={{ marginBottom: "10px" }}
            placeholder="Email"
            onChange={event =>
              this.setState({
                email: event.target.value
              })
            }
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={event =>
              this.setState({
                password: event.target.value
              })
            }
          />
          <Button
            type="primary"
            style={{ margin: "20px 20px 0px 20px" }}
            onClick={this.submit}
            loading={this.state.loading}
          >
            Log In
          </Button>

          {this.props.error ? (
            <h3
              style={{
                textAlign: "center",
                color: "red",
                margin: "10px 0px -10px 0px"
              }}
            >
              Login Error!
            </h3>
          ) : null}
        </div>

        <Divider />
        <Button
          style={{ margin: "0px 20px 0 20px" }}
          onClick={() => Router.push("/register/student")}
        >
          Register (Student)
        </Button>
        <Button
          style={{ margin: "0px 20px 0 20px" }}
          onClick={() => Router.push("/register/admin")}
        >
          Register (Administrator)
        </Button>
      </div>
    );
  }

  renderLoggedIn() {
    const web3 = new Web3(
      "https://rinkeby.infura.io/v3/6a20903e63ec4a96a771a79800a1a1d4"
    );

    const full = (
      <div
        style={{
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <span style={{ fontSize: "120%" }}> Signed in as </span>
          <span
            style={{
              fontSize: "150%",
              color: "#10004e",
              fontWeight: "600"
            }}
          >
            {this.props.user.email}
          </span>
        </div>

        <Divider />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center"
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <span style={{ fontWeight: "600" }}> Address:&ensp;&nbsp;</span>
            <br />
            <span style={{ fontSize: "90% " }}>{this.props.user.address}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center"
          }}
        >
          {this.links.map(link => (
            <Button
              icon={link.icon}
              onClick={link.click}
              style={{ width: "120px", margin: "5px" }}
            >
              {link.text}
            </Button>
          ))}
        </div>
        <Button
          icon="logout"
          onClick={() => this.props.logoutUser(() => Router.push("/"))}
          type="danger"
          style={{ width: "220px" }}
        >
          Logout
        </Button>
      </div>
    );

    return full;
  }

  render() {
    return this.props.isAuthenticated
      ? this.renderLoggedIn()
      : this.renderNotLoggedIn();
  }

  links = [
    { text: "Bugs", icon: "exclamation-circle" },
    { text: "Friends", icon: "team" }
  ];
}

const mapStateToProps = state => {
  const { user, isAuthenticated, error } = state.auth;
  return { user, isAuthenticated, error };
};

export default connect(
  mapStateToProps,
  { loginUser, logoutUser }
)(PlayerInfo);
