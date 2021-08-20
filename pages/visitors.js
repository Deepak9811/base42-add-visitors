import React, { Component } from "react";
import Head from "next/head";

export class Visitors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersArray: [],
      err_message: false,
      menuListArray: [],
    };
  }

  componentDidMount() {
    this.getUsersList();
  }

  getUsersList() {
    let storeToken = JSON.parse(localStorage.getItem("token"));

    fetch(
      `${process.env.URL}/visitors/?from=10/06/2019&to=12/07/2020&pageNo=1&pageSize=5`,
      {
        method: "GET",
        headers: {
          access_token: storeToken,
        },
      }
    )
      .then((data) => {
        data.json().then((resp) => {
          console.log(resp);
          if (resp.Status === "success") {
            this.setState({
              usersArray: resp.data,
            });
          } else {
            this.setState({
              err_message: true,
            });
          }
        });
      })
      .catch((error) => {
        this.setState({
          message: "Please check your credentials.",
        });
      });
  }

  render() {
    return (
      <>
        <Head>
          <title>Vistors</title>
        </Head>

        <div className="container-fluid mg_tp">
          <div className="row">
            <main
              role="main"
              className="col-md-9 ml-sm-auto col-lg-12 px-md-4 font_s"
            >
              <h1 className="wd-20 fl hdn">visitors</h1>

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>User Id</th>
                      <th>Visitor Name</th>
                      <th>Mobile</th>
                      <th>Vehicle</th>
                      <th>Enter Date</th>
                      <th>Exit Date</th>
                      <th>Address</th>

                      <th>Image</th>
                      <th>Type of visitor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.usersArray.map((item, i) => (
                      <tr>
                        <td>{item.id}</td>
                        <td>{item.userId}</td>
                        <td>{item.name}</td>
                        <td>{item.mobile}</td>
                        <td>{item.vehicle_no}</td>
                        <td>{item.entry_date_time}</td>
                        <td>{item.exit_date_time}</td>
                        <td>{item.address}</td>

                        <td style={{ width: "5%", height: "5%" }}>
                          <img
                            src={item.image_url.toString()}
                            style={{ height: "55px" }}
                          />
                        </td>

                        <td>{item.type_of_visitor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  }
}

export default Visitors;
