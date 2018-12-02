import React, { Component } from "react";
import "./style.css";
import fire from "../config/fire.js";
import swal from "sweetalert2";

class ComplainForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requesttype: "",
      effectiveperson: "",
      requiredvehicles: "",
      contactedpersonnumber: "",
      nearestStation: "",
      complainername: "",
      priority: "",
      urgentdetails: "",
      description: "",
      department: "Police",
      location: ""
    };
  }

  onSubmit = e => {
    console.log(this.state.department);

    if (this.state.complainername.length < 3) {
      alert("Error");
    } else {
      var database = fire.database().ref();
      var skey = database.child(`${this.state.department}`).push();
      console.log(skey.key);
      let id = skey.key;

      const obj = {
        id: id,
        name: this.state.complainername,
        isNotify: false,
        phno: this.state.contactedpersonnumber,
        dept: this.state.department,
        description: this.state.description,
        reachIn: "20",
        date: new Date().toDateString(),
        location: this.state.location,
        priority: this.state.priority,
        urgentdetails: this.state.urgentdetails,
        status: "pending"
      };

      skey.push(obj);
      swal({
        title: "Success",
        text: "Data Send SuccesFully"
      });
      this.props.history.replace("/panel");
    }
  };

  render() {
    console.log(this.state.description);
    return (
      <div className="background">
        <div className="container-fluid">
          <div className="container">
            <div className="invisible">...</div>
            <div className="col-lg-12 row">
              <div className="d-flex justify-content-end col-lg-8">
                <h1>Emergency Request</h1>
              </div>
              <div className="d-flex justify-content-end col-lg-4">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.signout}
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-center">
              <h3>Send an Emergency request to the ...</h3>
            </div>

            <div className="invisible">...</div>

            <div className="row">
              <div className="form-group row col-lg-6">
                <label className="col-sm-4 col-form-label">Request Type</label>
                <div
                  className="col-sm-8"
                  onChange={e => this.setState({ requesttype: e.target.value })}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Request Type"
                  />
                  <span className="text-danger">
                    {this.state.errorinfieldtype}
                  </span>
                </div>
              </div>
              <div className="form-group row col-lg-6">
                <label className="col-sm-4 col-form-label">
                  Number of effective person
                </label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    onChange={e =>
                      this.setState({ effectiveperson: e.target.value })
                    }
                  >
                    <option>Please Select Person count</option>
                    <option> 1 to 5 </option>
                    <option> 6 to 20 </option>
                    <option> 21 to 50 </option>
                    <option> 51 to 100 </option>
                    <option> More than 100 </option>
                  </select>
                  <span className="text-danger">
                    {this.state.errorinfieldworkAgency}
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group row col-lg-6">
                <label className="col-sm-4 col-form-label">
                  Required Vehicles
                </label>
                <div
                  className="col-sm-8"
                  onChange={e =>
                    this.setState({ requiredvehicles: e.target.value })
                  }
                >
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Required Vehicles"
                  />
                  <span className="text-danger">
                    {this.state.errorinprojectnumbers}
                  </span>
                </div>
              </div>
              <div className="form-group row col-lg-6">
                <label className="col-sm-4 col-form-label">
                  Contacted person number
                </label>
                <div
                  className="col-sm-8"
                  onChange={e =>
                    this.setState({ contactedpersonnumber: e.target.value })
                  }
                >
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Contacted person number"
                  />
                  <span className="text-danger">
                    {this.state.errorinprojectname}
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group row col-lg-6">
                <label className="col-sm-4 col-form-label">
                  Nearest Station
                </label>
                <div
                  className="col-sm-8"
                  onChange={e =>
                    this.setState({ nearestStation: e.target.value })
                  }
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nearest Station"
                  />
                  <span className="text-danger">
                    {this.state.erroriniqctype}
                  </span>
                </div>
              </div>
              <div className="form-group row col-lg-6">
                <label className="col-sm-4 col-form-label">
                  Complainer Name
                </label>
                <div
                  className="col-sm-8"
                  onChange={e =>
                    this.setState({ complainername: e.target.value })
                  }
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Complainer Name"
                  />
                  <span className="text-danger">
                    {this.state.erroriniqctype}
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group row col-lg-6">
                <label className="col-sm-4 col-form-label">Priority</label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    onChange={e => this.setState({ priority: e.target.value })}
                  >
                    <option>Please Select Priority</option>
                    <option value="urgent"> Urgent </option>
                    <option value="ver urgent"> Very Urgent </option>
                    <option value="high"> High </option>
                  </select>
                  <span className="text-danger">
                    {this.state.erroriniqctype}
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group row col-lg-6">
                <label className="col-sm-4 col-form-label">Department</label>
                <div className="col-sm-8">
                  <select
                    className="form-control"
                    onChange={e =>
                      this.setState({ department: e.target.value })
                    }
                  >
                    <option>Please Select Department</option>
                    <option value="Police"> Police </option>
                    <option value="Ambulance"> Ambulance </option>
                    <option value="FireBrigade"> FireBrigade </option>
                  </select>
                  <span className="text-danger">
                    {this.state.erroriniqctype}
                  </span>
                </div>
              </div>

              <div className="form-group row col-lg-6">
                <label className="col-sm-4 col-form-label">Location</label>
                <div
                  className="col-sm-8"
                  onChange={e => this.setState({ location: e.target.value })}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="invisible">...</div>
              <div className="col-sm-2">
                <label> Description </label>
              </div>
              <div
                className="col-sm-12"
                onChange={e => this.setState({ description: e.target.value })}
              >
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                  placeholder="Enter a Description"
                />
                <span className="text-danger">{this.state.erroriniqctype}</span>
              </div>
            </div>

            <div className="invisible">...</div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.onSubmit}
              >
                Submit Request
              </button>
            </div>

            <div className="invisible">...</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComplainForm;
