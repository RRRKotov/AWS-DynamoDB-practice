import { useState, useEffect, useCallback } from "react";
import { EntityForm } from "../../common/EntityForm/EntityForm";
import { useParams } from "react-router";
import { entityApi } from "../../../api/entityApi";
import { IForm } from "../../../types.d";

export const EntityEditing = () => {
  const [entityForEditing, setEntityForEditing] = useState(undefined);

  const { id } = useParams<Pick<IForm, "id">>();
  const getEntityById = useCallback( async () => {
    const { data } = await entityApi.getEntityById(id);
    setEntityForEditing(data.Item);
  },[id])
  useEffect(() => {
    getEntityById();
  }, [getEntityById]);
  return <EntityForm id={id} entityForEdit={entityForEditing} />;
};
