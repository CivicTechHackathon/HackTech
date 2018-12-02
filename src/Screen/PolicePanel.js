import React, { Component } from "react";
import fire from "../config/fire";
import Notification from "react-web-notification";
import Select from "react-select";
window.React = React;

class PolicePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ignore: true,
      title: "",
      arr: [],
      selectedVal: "",
      jobStatus: [
        { value: "Pending", label: "Pending" },
        { value: "Completed", label: "Completed" },
        { value: "Fake", label: "Fake" },
        { value: "Ongoing", label: "Ongoing" }
      ]
    };
  }

  showNotification() {
    if (this.state.ignore) {
      return;
    }

    this.state.arr.map(val => {
      console.log(val.id);

      if (!val.isNotify) {
        const title = val.name;
        const body = val.description;
        const tag = val.time;
        const id = val.id;
        const icon =
          "http://georgeosddev.github.io/react-web-notification/example/Notifications_button_24.png";

        const options = {
          tag: tag,
          body: body,
          id: id,
          icon: icon,
          lang: "en",
          dir: "ltr",
          sound: "./sound.mp3"
        };
        this.setState({
          title: title,
          options: options
        });
      }
      return;
    });
  }

  render() {
    return (
      <div>
        <h1>PolicePanel</h1>
        <button className="btn btn-primary" onClick={this.logout}>
          Logout
        </button>
        <br />

        <div>
          <button onClick={this.showNotification.bind(this)}>Notif!</button>
          <Notification
            ignore={this.state.ignore && this.state.title !== ""}
            notSupported={this.handleNotSupported.bind(this)}
            onPermissionGranted={this.handlePermissionGranted.bind(this)}
            onPermissionDenied={this.handlePermissionDenied.bind(this)}
            onShow={this.handleNotificationOnShow.bind(this)}
            onClick={() =>
              this.handleNotificationOnClick(this.state.options.id)
            }
            onClose={this.handleNotificationOnClose.bind(this)}
            onError={this.handleNotificationOnError.bind(this)}
            timeout={6000}
            title={this.state.title}
            options={this.state.options}
          />
          <audio id="sound" preload="auto">
            <source src="./sound.mp3" type="audio/mpeg" />
            <source src="./sound.ogg" type="audio/ogg" />
            <embed
              hidden="true"
              autostart="false"
              loop="false"
              src="./sound.mp3"
            />
          </audio>
        </div>

        <br />
        <br />
        {this.state.arr.length > 0 && this.renderComplain()}
      </div>
    );
  }

  componentDidMount() {
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
      this.showNotification();
    });
  }

  handlePermissionGranted() {
    console.log("Permission Granted");
    this.setState({
      ignore: false
    });
  }
  handlePermissionDenied() {
    console.log("Permission Denied");
    this.setState({
      ignore: true
    });
  }
  handleNotSupported() {
    console.log("Web Notification not Supported");
    this.setState({
      ignore: true
    });
  }

  handleNotificationOnClick = key => {
    console.log("key", key);

    let dbRef = fire.database().ref(`Police/${key}`);
    var updateData = {
      isNotify: true
    };
    dbRef.update(updateData);
    console.log("updated=====>");
  };

  handleNotificationOnError(e, tag) {
    console.log(e, "Notification error tag:" + tag);
  }

  handleNotificationOnClose(e, tag) {
    console.log(e, "Notification closed tag:" + tag);
  }

  handleNotificationOnShow(e, tag) {
    this.playSound();
    console.log(e, "Notification shown tag:" + tag);
  }

  playSound(filename) {
    document.getElementById("sound").play();
  }

  renderComplain = () => {
    return this.state.arr.map((val, i) => {
      return (
        <div key={val.id} className="card text-center mt-3">
          <div className="card-header">{val.name}</div>
          <div className="card-body">
            <h5 className="card-title">{val.location}</h5>
            <p className="card-text">{val.description}</p>
            <span>{val.status}</span>
            <Select
              className="basic-single"
              classNamePrefix="select"
              onChange={val => this.setState({ selectedVal: val.value })}
              defaultValue={this.state.jobStatus[0]}
              name="color"
              options={this.state.jobStatus}
            />
            <button
              className="btn btn-info"
              onClick={() => this.updateStatus(val.id, i)}
            >
              Update Status
            </button>
          </div>
          <div className="card-footer text-muted">{val.date}</div>
        </div>
      );
    });
  };

  updateStatus = (key, i) => {
    const { selectedVal } = this.state;
    let dbRef = fire.database().ref(`Police/${key}`);
    var updateData = {
      status: selectedVal
    };
    dbRef.update(updateData);
    var { arr } = this.state;

    arr[i].status = selectedVal;

    this.setState({
      arr
    });
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

export default PolicePanel;
