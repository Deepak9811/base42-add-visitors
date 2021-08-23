import React, { PureComponent } from "react";
import Link from "next/link";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";

class Entity extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      entityId: [],
      entityName: "",
      entityMember: "",
      categoryId: "",
      active: "",

      err_message: "",
    };
  }

  check(e) {
    e.preventDefault();

    if (
      this.state.entityId !== "" &&
      this.state.entityName !== "" &&
      this.state.entityMember !== "" &&
      this.state.categoryId !== "" &&
      this.state.active !== ""
    ) {
      this.sumbit();
    } else {
      this.setState({ err_message: "Please fill all the fields." });
    }
  }

  sumbit() {
    let storeToken = JSON.parse(localStorage.getItem("token"));

    fetch(`${process.env.URL}/Entity`, {
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
              entityId: [],
              entityName: "",
              entityMember: "",
              categoryId: "",
              active: "",
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
              Entity <FontAwesomeIcon icon={faUserPlus} />
            </h3>
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Entity Id
            </label>
            <input
              value={this.state.entityId}
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Entity Id"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                    entityId: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              EntityName
            </label>
            <input
              value={this.state.entityName}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="entityName"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  entityName: e.target.value,
                })
              }
            />
          </div>

        

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              EntityMember
            </label>
            <input
              value={this.state.entityMember}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="entityMember"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  entityMember: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              categoryId
            </label>
            <input
              value={this.state.categoryId}
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="categoryId number"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  categoryId: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Active
            </label>
            <input
              value={this.state.active}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Active "
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  active: e.target.value,
                })
              }
            />
          </div>

          

          {this.state.err_message ? (
            <p className="err_message">{this.state.err_message}</p>
          ) : null}

          <button type="submit" class="btn btn-primary bsn">
            Add <FontAwesomeIcon className="lgs" icon={faSignInAlt} />
          </button>
        </form>
      </>
    );
  }
}

export default Entity;
