import React, { useState, useEffect } from "react";
import { EntityForm } from "../../common/EntityForm/EntityForm";
import { useParams } from "react-router";
import { IRoutingParams } from "./EntityEditing.d";
import axios from "axios";
import { useHistory } from "react-router";
import { AxiosError } from "axios";

export const EntityEditing = () => {
  const history = useHistory();
  const [entityForEditing, setEntityForEditing] = useState(undefined);
  const getentity = (id: number) => {
    axios
      .get(`http://localhost:5000/getentity?id=${id}`)
      .then((response) => {
        setEntityForEditing(response.data);
      })
      .catch((err: AxiosError) => {
        err.response?.status && history.push(`/`);
      });
  };
  const { id } = useParams<IRoutingParams>();
  useEffect(() => {
    id && getentity(id);
  }, []);
  return <EntityForm id={id} entityForEdit={entityForEditing} />;
};
