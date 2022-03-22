import React from "react";
import "./NotFoundPage.css";
import { Button } from "../../common/Button/Button";
import { useHistory } from "react-router";

export const NotFoundPage = () => {
  const history = useHistory();
  return (
    <div className="container">
      <div className="text">Page not found((</div>
      <Button onClick={() => history.push("/")} value="Go home" />
    </div>
  );
};
