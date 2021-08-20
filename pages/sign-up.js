import React, { PureComponent } from "react";
import Link from "next/link";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

class SignUp extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      mobile: "",
      pass: "",
      dob: "",
      address: "",
      creationDate: "",
      createdBy: "",
      loggedin: false,
      err_message: "",
    };
  }

  check(e) {
    e.preventDefault();

    if (
      this.state.name !== "" &&
      this.state.mobile !== "" &&
      this.state.email !== "" &&
      this.state.pass !== "" &&
      this.state.dob !== "" &&
      this.state.address !== "" &&
      this.state.createdBy !== "" &&
      this.state.creationDate !== ""
    ) {
      this.sumbit();
    } else {
      this.setState({ err_message: "Please fill all the fields." });
    }
  }

  sumbit() {

    let storeToken = JSON.parse(localStorage.getItem("token"));
    if (
      this.state.email === "" ||
      this.state.pass === "" ||
      this.state.name === "" ||
      this.state.mobile === "" ||
      this.state.dob === "" ||
      this.state.address === "" ||
      this.state.creationDate === "" ||
      this.state.createdBy === ""
    ) {
      this.setState({
        err_message: "Please fill all the details.",
      });
    } else if (
      this.state.email !== "" &&
      this.state.pass !== "" &&
      this.state.name !== "" &&
      this.state.mobile !== "" &&
      this.state.dob !== "" &&
      this.state.address !== "" &&
      this.state.createdBy !== "" &&
      this.state.creationDate !== ""
    ) {
      fetch(`${process.env.URL}/visitors`, {
        method: "POST",
        headers: {
          access_token: storeToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      })
        .then((result) => {
          result.json().then((resp) => {
            if (resp.Status === "success") {
              this.setState({
                email: "",
                mobile: "",
                pass: "",
                name: "",
                dob: "",
                address: "",
                createdBy: "",
                creationDate: "",
                err_message: true,
              });
              alert("register");
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
        <form className="frm" onSubmit={(e) => this.check(e)}>
          <div className="sgn">
            <h3>
              Sign up <FontAwesomeIcon icon={faUserPlus} />
            </h3>
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              value={this.state.email}
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email Address"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  email: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Name
            </label>
            <input
              value={this.state.name}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Name"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  name: e.target.value,
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
              onClick={() => this.errMessage()}
              onChange={(e) => this.setState({ pass: e.target.value })}
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Date of birth
            </label>
            <input
              value={this.state.dob}
              type="date"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Date of birth"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  dob: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Address
            </label>
            <input
              value={this.state.address}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Address"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  address: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Mobile
            </label>
            <input
              value={this.state.mobile}
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Mobile number"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  mobile: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Creation date
            </label>
            <input
              value={this.state.creationDate}
              type="date"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="creation date "
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  creationDate: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Created by
            </label>
            <input
              value={this.state.createdBy}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Created by "
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  createdBy: e.target.value,
                })
              }
            />
          </div>

          {this.state.err_message ? (
            <p className="err_message">{this.state.err_message}</p>
          ) : null}

          <button type="submit" class="btn btn-primary bsn">
            Sign up <FontAwesomeIcon className="lgs" icon={faSignInAlt} />
          </button>

          <div className="text-center mgp-t-2">
            <p>
              Already have an account?
              <Link href="login">
                <a>Login</a>
              </Link>
            </p>
          </div>
        </form>
      </>
    );
  }
}

export default SignUp;
