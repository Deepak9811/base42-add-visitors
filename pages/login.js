import React, { PureComponent } from "react";
import Link from "next/link";
import Router from "next/router";
import Head from "next/head";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faHome,
  faVideo,
  faSign,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loginId: "",
      password: "",
      loggedin: false,
      err_message: "",
    };
  }

  login(e) {
    e.preventDefault();
    if (this.state.loginId === "" || this.state.password === "") {
      this.setState({
        err_message: "Please enter your acounts details to login.",
      });
    } else if (this.state.loginId !== "" && this.state.password !== "") {
      fetch(
        `${process.env.URL}Login?loginId=${this.state.loginId}&password=${this.state.password}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.state),
        }
      )
        .then((result) => {
          result.json().then((resp) => {
            console.log(resp.data.Token);
            if (resp.Status === "success") {
              localStorage.setItem("token", JSON.stringify(resp.data.Token));
              this.setState({
                loginId: "",

                password: "",
                err_message: true,
              });
              // Router.push("/")
            } else {
              this.setState({
                err_message: "Please Check your details",
              });
            }
          });
        })

        //CATCHING ERROR FROM FETCH (IF ANY) IN API
        .catch((error) => {
          this.setState({
            message: "Please check your credentials.",
          });
        });
    }
  }

  errMessage() {
    this.setState({
      err_message: false,
    });
  }

  render() {
    return (
      <>
        <Head>
          <title>Login</title>
        </Head>

        <form className="frm" onSubmit={(e) => this.login(e)}>
          <h5>Sign</h5>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              value={this.state.loginId}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email Address"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  loginId: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              value={this.state.password}
              onClick={() => this.errMessage()}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <div class="mb-3 form-check">
            <input
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>

          {this.state.err_message ? (
            <p className="err_message">{this.state.err_message}</p>
          ) : null}

          <button type="submit" class="btn btn-primary bsn">
            Log in <FontAwesomeIcon className="lgs" icon={faSignInAlt} />
          </button>

          <div className="text-center mgp-t-2">
            <p>
              Don't have an account yet?
              <Link href="sign-up">
                <a>Sign up here</a>
              </Link>
            </p>
          </div>
        </form>
      </>
    );
  }
}

export default Login;
