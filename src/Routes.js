import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Screen/Login";
import Panel from "./Screen/Panel";
import ComplainForm from "./Screen/ComplainForm";
import PolicePanel from "./Screen/PolicePanel";

class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/panel" exact component={Panel} />
          <Route path="/form" exact component={ComplainForm} />
          <Route path="/PolicePanel" exact component={PolicePanel} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
