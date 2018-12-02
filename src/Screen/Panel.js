import React, { Component } from "react";
import fire from "../config/fire";
import { Link } from "react-router-dom";
import "./Ke.css";

class Panel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: [],
      view: true,
      pendingArr: [],
      police: false,
      fire: false,
      ambulance: false,
      KE: false,
      Complain: false
    };
  }
  render() {
    return (
      <div>
        {this.renderHeader()}

        {this.state.arr.length > 0 && this.renderComplain()}
      </div>
    );
  }

  renderHeader = () => {
    return (
      <div className="mb-3">
        <div className="invisible">...</div>
        <div>
          <div className="col-lg-12 row">
            <div className="d-flex row justify-content-end col-lg-11">
              <Link to="/form">
                <button type="button" className="btn btn-success">
                  Add New Complain
                </button>
              </Link>
            </div>
            <div className="mt-3 d-flex row justify-content-end col-lg-11">
              <button
                onClick={this.logout}
                type="button"
                className="btn btn-danger"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="invisible">...</div>

        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
          <a class="navbar-brand" style={{ color: "white" }} href="#">
            Emergency System
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon" />
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a
                class="nav-item nav-link active"
                style={{ color: "white" }}
                href="#"
              >
                Police<span class="sr-only">(current)</span>
              </a>
              <a class="nav-item nav-link" style={{ color: "white" }} href="#">
                Ambulance
              </a>

              <a
                class="nav-item nav-link disabled"
                style={{ color: "white" }}
                href="#"
              >
                Fire Brigade
              </a>
            </div>
          </div>
        </nav>
      </div>
    );
  };

  fetchPending = () => {
    const { pendingArr } = this.state;
    var dbRef = fire
      .database()
      .ref("Police")
      .orderByChild("status")
      .equalTo("Ongoing");
    dbRef.on("child_added", snap => {
      console.log(snap.val());

      pendingArr.push({
        ...snap.val(),
        id: snap.key
      });
      this.setState({
        pendingArr
      });
    });
  };

  componentDidMount() {
    this.fetchPending();
    const { arr } = this.state;
    let dbRef = fire.database().ref("Police");
    dbRef.on("child_added", snap => {
      console.log(snap.val());

      arr.push({
        ...snap.val(),
        id: snap.key
      });
      this.setState({
        arr
      });
    });
  }

  openCity(evt, cityName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  renderComplain = () => {
    return (
      <div>
        <div className={"tab"}>
          <button
            className={"tablinks"}
            onClick={event => this.openCity(event, "allreq")}
          >
            Pending Request
          </button>
          <button
            className={"tablinks"}
            onClick={event => this.openCity(event, "pendingreq")}
          >
            Ongoing Request
          </button>
          <button
            className={"tablinks"}
            onClick={event => this.openCity(event, "completereq")}
          >
            Done Request
          </button>
        </div>

        {/* Button End */}

        <div id={"allreq"} className={"tabcontent"} style={{ height: "200px" }}>
          <h3>Pending Request</h3>
          {this.state.pendingArr.map(val => {
            console.log("PendingArr===>", val);

            return (
              <div key={val.id} className="card text-center mt-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Location</th>
                      <th scope="col">Description</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Details</th>
                    </tr>
                  </thead>
                  <tr>
                    <td>{val.name}</td>
                    <td>{val.location}</td>
                    <td>{val.description}</td>
                    <td
                      class={
                        val.status === "pending"
                          ? "badge badge-warning"
                          : "badge badge-success"
                      }
                    >
                      {val.status}{" "}
                    </td>
                    <td>{val.date}</td>
                    <td>
                      {" "}
                      <button className="btn btn-primary">
                        {" "}
                        Click For Details{" "}
                      </button>{" "}
                    </td>
                  </tr>
                </table>
                {/* <div className="card-header">{val.name}</div> */}
                {/* <div className="card-body">
                  <h5 className="card-title">{val.location}</h5>
                  <p className="card-text">{val.description}</p>
                  <span
                    class={
                      val.status === "pending"
                        ? "badge badge-warning"
                        : "badge badge-success"
                    }
                  >
                    {val.status}
                  </span> */}
                {/* {val.status === "pending"} */}
                {/* <p className="text-muted">{val.status}</p> */}
                {/* </div> */}
                {/* <div className="card-footer text-muted">{val.date}</div> */}
              </div>
            );
          })}
        </div>

        <div
          id={"pendingreq"}
          className={"tabcontent"}
          style={{ height: "200px" }}
        >
          <h3>Ongoing Request</h3>
          {this.state.arr.map(val => {
            return (
              <div key={val.id} className="card text-center mt-3">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Location</th>
                      <th scope="col">Description</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                      <th scope="col">Details</th>
                    </tr>
                  </thead>
                  <tr>
                    <td>{val.name}</td>
                    <td>{val.location}</td>
                    <td>{val.description}</td>
                    <td
                      class={
                        val.status === "pending"
                          ? "badge badge-warning"
                          : "badge badge-success"
                      }
                    >
                      {val.status}{" "}
                    </td>
                    <td>{val.date}</td>
                    <td>
                      {" "}
                      <button className="btn btn-primary">
                        {" "}
                        Click For Details{" "}
                      </button>{" "}
                    </td>
                  </tr>
                </table>

                {/* <div className="card-header">{val.name}</div>
                <div className="card-body">
                  <h5 className="card-title">{val.location}</h5>
                  <p className="card-text">{val.description}</p>
                  <span
                    class={
                      val.status === "pending"
                        ? "badge badge-warning"
                        : "badge badge-success"
                    }
                  >
                    {val.status}
                  </span>
                  {val.status === "pending"}
                  <p className="text-muted">{val.status}</p>
                </div> */}
                {/* <div className="card-footer text-muted">{val.date}</div> */}
              </div>
            );
          })}
        </div>

        <div
          id={"completereq"}
          className={"tabcontent"}
          style={{ height: "200px" }}
        >
          <h3>Done Request</h3>
          {this.state.arr.map(val => {
            return (
              <div key={val.id} className="card text-center mt-3">
                <div className="card-header">{val.name}</div>
                <div className="card-body">
                  <h5 className="card-title">{val.location}</h5>
                  <p className="card-text">{val.description}</p>
                  <span
                    class={
                      val.status === "pending"
                        ? "badge badge-warning"
                        : "badge badge-success"
                    }
                  >
                    {val.status}
                  </span>
                  {val.status === "pending"}
                  <p className="text-muted">{val.status}</p>
                </div>
                <div className="card-footer text-muted">{val.date}</div>
              </div>
            );
          })}
        </div>
      </div>
    );

    // return this.state.arr.map(val => {
    //   return (
    //     <div key={val.id} className="card text-center mt-3">
    //       <div className="card-header">{val.name}</div>
    //       <div className="card-body">
    //         <h5 className="card-title">{val.location}</h5>
    //         <p className="card-text">{val.description}</p>
    //         <span
    //           class={
    //             val.status === "pending"
    //               ? "badge badge-warning"
    //               : "badge badge-success"
    //           }
    //         >
    //           {val.status}
    //         </span>
    //         {val.status === "pending"}
    //         <p className="text-muted">{val.status}</p>
    //       </div>
    //       <div className="card-footer text-muted">{val.date}</div>
    //     </div>
    //   );
    // });
  };

  logout = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        this.props.history.replace("/");
      })
      .catch(error => {});
  };
}

export default Panel;
