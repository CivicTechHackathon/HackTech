import React, { Component } from "react";
import swal from "sweetalert2";
import fire from "../config/fire";

class ComplainForm extends Component {
  adddata = () => {
    var name = document.getElementById("name").value;
    var description = document.getElementById("description").value;
    var no = document.getElementById("phno").value;
    var location = document.getElementById("location").value;
    var priority = document.getElementById("priority").value;
    var urgencyDetail = document.getElementById("urgencyDetail").value;
    var dept = document.getElementById("dept").value;

    // var police = document.getElementById("police").value;
    // var firebrigade = document.getElementById("firebrigade").value;
    // var ambulance = document.getElementById("ambulance").value;

    if (name.length < 3) {
      swal({
        title: "Name Error",
        text: "Name may be empt or invalid"
      });
    } else if (description.length < 2) {
      swal({
        title: "Description Error",
        text: "Description atleast contain 20 character"
      });
    } else if (no.length < 3) {
      swal({
        title: "Phone No Error",
        text: "Phone number must contain 11 digits"
      });
    } else if (location.length < 4) {
      swal({
        title: "Location Error",
        text: "Location Must Contain 3 digits"
      });
    } else {
      var database = fire.database().ref();
      var skey = database.child("Police").push();
      const send = {
        id: skey.key,
        name: name,
        isNotify: false,
        phno: no,
        dept: dept,
        description: description,
        reachIn: "20",
        date: new Date().toDateString(),
        location: location,
        priority: priority,
        urgencyDetail: urgencyDetail,
        status: "pending"
      };

      skey.set(send);
      swal({
        title: "Success",
        text: "Data Send SuccesFully"
      });
      this.props.history.replace("/panel");
    }
  };

  render() {
    return (
      <div>
        <div style={{ backgroundColor: "rgb(56 , 167 ,24)", height: "140vh" }}>
          <div
            style={{ margin: "1px auto", padding: "2%" }}
            className={"col-sm-6"}
          >
            <div
              style={{
                margin: "2px auto",
                border: "solid 2px rgb(24 , 70 ,11)",
                minWidth: "300px",
                backgroundColor: "white",
                padding: "8%",
                borderRadius: "10px",
                overflow: "hidden"
              }}
            >
              <h3>Complain Form</h3>
              <hr />

              <div className="form-group" style={{ textAlign: "left" }}>
                <label>Complainer's Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter Complainer's Name"
                />
              </div>
              <div className="form-group" style={{ textAlign: "left" }}>
                <label align="left">Phone No</label>
                <input
                  className="form-control"
                  id="phno"
                  placeholder="Enter Phone No"
                  rows="3"
                />
              </div>
              <div className="form-group" style={{ textAlign: "left" }}>
                <label>Location</label>
                <input
                  className="form-control"
                  id="location"
                  placeholder="Enter Location"
                  rows="3"
                />
              </div>
              <div className="form-group" style={{ textAlign: "left" }}>
                <label>Description</label>
                <textarea
                  style={{ height: "100px" }}
                  type="text"
                  className="form-control"
                  name="description"
                  id="description"
                  aria-describedby="emailHelp"
                  placeholder="Enter Description About Complain"
                />
              </div>

              <div className="form-group">
                <label>Priority</label>
                <br />
                <select id="priority" className="form-control">
                  <option value="urgent">Uregent</option>
                  <option value="very urgent" selected="selected">
                    Very Urgent
                  </option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="form-group" style={{ textAlign: "left" }}>
                <label>
                  Urgency Detail{" "}
                  <span style={{ fontSize: 11 }}>(optional)</span>
                </label>
                <textarea
                  style={{ height: "60px" }}
                  type="text"
                  className="form-control"
                  name="description"
                  id="urgencyDetail"
                  aria-describedby="emailHelp"
                  placeholder="Enter Detail About Urgency"
                />
              </div>
              {/* {this.renderCheck()} */}
              <div className="form-group">
                <label>Departments</label>
                <br />
                <select id="dept" className="form-control">
                  <option value="Police">Police</option>
                  <option value="Ambulance" selected="selected">
                    Ambulance
                  </option>
                  <option value="Fire Brigade">Fire Brigade</option>
                </select>
              </div>
              <button
                className="form-control btn btn-success"
                style={{ backgroundColor: "rgb(24 , 70 ,11)" }}
                onClick={this.adddata}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderCheck = () => {
    return (
      <div className="mb-3">
        <div className="form-check">
          <label className="form-check-label">
            <input
              id="police"
              className="form-check-input"
              type="checkbox"
              value="Police"
            />
            Police
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input
              id="ambulance"
              className="form-check-input"
              type="checkbox"
              value="Ambulance"
            />
            Ambulance
          </label>
        </div>
        <div className="form-check">
          <label className="form-check-label">
            <input
              id="firebrigade"
              className="form-check-input"
              type="checkbox"
              value="Fire Brigade"
            />
            Fire Brigade
          </label>
        </div>
      </div>
    );
  };
}
export default ComplainForm;
