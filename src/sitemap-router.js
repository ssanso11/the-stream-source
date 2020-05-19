import React from "react";
import { Switch, Route } from "react-router";

export default (
  // Switch is added in v4 react-router
  <Switch>
    <Route exact path="/" />
    <Route exact path="/home" />
    <Route exact path="/reviews" />
    <Route exact path="/about" />
    <Route exact path="/reviews/:id" />
  </Switch>
);
