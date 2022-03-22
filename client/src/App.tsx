import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { EntityList } from "./components/pages/EntityList/EntityList";
import { EntityCreation } from "./components/pages/EntityCreation/EntityCreation";
import { EntityEditing } from "./components/pages/EntityEditing/EntityEditing";
import { NotFoundPage } from "./components/pages/NotFoundPage/NotFoundPage";
export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <EntityList />
        </Route>
        <Route path="/creation">
          <EntityCreation />
        </Route>
        <Route path="/editing/:id">
          <EntityEditing />
        </Route>
        <Route component={NotFoundPage}></Route>
      </Switch>
    </Router>
  );
};
