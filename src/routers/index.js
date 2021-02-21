import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import Planets from "../components/Planets";
import PlanetDetails from "../components/PlanetDetails";
import Films from "../components/Films";
import Residents from "../components/Residents";

const Router = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/planets" />
      <Route exact path="/planets" component={Planets} />
      <Route exact path="/planets/:planetId" component={PlanetDetails} />
      <Route exact path="/planets/:planetId/films" component={Films} />
      <Route exact path="/planets/:planetId/residents" component={Residents} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};

export default Router;
