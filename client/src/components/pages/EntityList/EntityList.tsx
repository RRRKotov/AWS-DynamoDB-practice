import React from "react";
import { EntityTable } from "./EntityTable/EntityTable";
import "./EntityList.css";
import { Button } from "../../common/Button/Button";
import { useHistory } from "react-router-dom";

export const EntityList = () => {
  const history = useHistory();
  return (
    <main className="entityList_main">
      <h1 className="entityList_header">List of People</h1>
      <EntityTable />
      <Button
        onClick={() => {
          history.push("/creation");
        }}
        value="Create new"
      />
    </main>
  );
};
