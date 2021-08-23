import React, { PureComponent } from "react";
import Link from "next/link";
import Router from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faUserAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

class AddVisitor extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      mobile: "",
      address: "",
      entry_date_time: this.getCurrentDate(),
      exit_date_time: this.getCurrentDate(),
      type_of_visitor: "",
      id_type: "",
      vehicle_no: "",
      id_no: "",
      gate_id: "",
      purpose: "",
      entity_id: "",
      entity_name: "",
      entity_member: "",

      visitId: [],
      userId: [],

      photo: "",
      err_message: "",
    };
  }

  getCurrentDate(separator = "-") {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    var hour = newDate.getHours();
    var minute = newDate.getMinutes();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date} ${hour}:${minute}`;
  }

  onChangeImage(e) {
    let file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;

    this.setState({
      base64TextString: btoa(binaryString),
    });
  }

  check(e) {
    e.preventDefault();

    if (
      this.state.name !== "" &&
      this.state.mobile !== "" &&
      this.state.address !== "" &&
      this.state.entity_name !== "" &&
      this.state.entry_date_time !== "" &&
      this.state.id_no !== "" &&
      this.state.vehicle_no !== "" &&
      this.state.photo !== "" &&
      this.state.entity_member !== "" &&
      this.state.entity_id !== "" &&
      this.state.purpose !== "" &&
      this.state.id_type !== "" &&
      this.state.type_of_visitor !== "" &&
      this.state.exit_date_time !== "" &&
      this.state.gate_id !== "" &&
      this.state.visitId !== "" &&
      this.state.userId !== ""
    ) {
      this.sumbit();
    } else {
      console.log(this.state)
      this.setState({ err_message: "Please fill all the fields." });
    }
  }

  sumbit(e) {
    console.log(this.state.base64TextString);
    let storeToken = JSON.parse(localStorage.getItem("token"));

    fetch(`${process.env.URL}/visitors`, {
      method: "POST",
      headers: {
        access_token: storeToken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        photo: this.state.base64TextString,

        name: this.state.name,
        mobile: this.state.mobile,
        address: this.state.address,
        entry_date_time: this.getCurrentDate(),
        vehicle_no: this.state.vehicle_no,
        id_no: this.state.id_no,
        gate_id: this.state.gate_id,
        entity_name: this.state.entity_name,

        entity_member: this.state.entity_member,
        entity_id: this.state.entity_id,
        purpose: this.state.purpose,
        id_type: this.state.id_type,
        type_of_visitor: this.state.type_of_visitor,
        exit_date_time: this.getCurrentDate(),

        visitId: this.state.visitId,
        userId: this.state.userId,
      }),
    }).then((result) => {
      result.json().then((resp) => {
        if (resp.Status === "success") {
          this.setState({
            name: "",
            mobile: "",
            address: "",
            entry_date_time: "",
            vehicle_no: "",
            id_no: "",
            gate_id: "",
            entity_name: "",
            photo: "",
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
        <form
          className="frm"
          onSubmit={(e) => this.check(e)}
          // onChange={(e) => this.onChangeImage(e)}
        >
          <div className="sgn">
            <h3>
              Add Visitor <FontAwesomeIcon icon={faUserPlus} />
            </h3>
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
            <label for="exampleInputEmail1" class="form-label">
              Mobile
            </label>
            <input
              value={this.state.mobile}
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Mobile"
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
              Entry Date Itime
            </label>
            <input
              value={this.getCurrentDate()}
              type="datetime"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Entry Date Itime"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  entry_date_time: e.target.value,
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
              Vehicle No
            </label>
            <input
              value={this.state.vehicle_no}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Vehicle No"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  vehicle_no: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Id No
            </label>
            <input
              value={this.state.id_no}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Id No"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  id_no: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Gate Id
            </label>
            <input
              value={this.state.gate_id}
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Gate Id"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  gate_id: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              Entity Name
            </label>
            <input
              value={this.state.entity_name}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Entity Name"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  entity_name: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              entity member
            </label>
            <input
              value={this.state.entity_member}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Entity Name"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  entity_member: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              entity id
            </label>
            <input
              value={this.state.entity_id}
              type="text"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Entity Name"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  entity_id: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              purpose
            </label>
            <input
              value={this.state.purpose}
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Entity Name"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  purpose: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              id type
            </label>
            <input
              value={this.state.id_type}
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Entity Name"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  id_type: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              type of visitor
            </label>
            <input
              value={this.state.type_of_visitor}
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Entity Name"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  type_of_visitor: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              exit_date_time
            </label>
            <input
              value={this.getCurrentDate()}
              type="datetime"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Entity Name"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  exit_date_time: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              visitId
            </label>
            <input
              value={this.state.visitId}
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Entity Name"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  visitId: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              userId
            </label>
            <input
              value={this.state.userId}
              type="number"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Entity Name"
              onClick={() => this.errMessage()}
              onChange={(e) =>
                this.setState({
                  userId: e.target.value,
                })
              }
            />
          </div>

          <div class="mb-3">
            <label for="file" class="form-label">
              Photo
            </label>
            <input
              value={this.state.photo}
              type="file"
              class="form-control"
              id="file"
              // accept=".jpeg,.png,.jpg"
              aria-describedby="emailHelp"
              placeholder="Photo"
              onClick={() => this.errMessage()}
              onChange={(e) => {
                this.onChangeImage(e);
                this.setState({
                  photo: e.target.value,
                });
              }}
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

export default AddVisitor;
