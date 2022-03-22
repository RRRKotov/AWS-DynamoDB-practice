import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./EntityForm.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import * as yup from "yup";
import { entityApi } from "../../../api/entityApi";
import { yupResolver } from "@hookform/resolvers/yup";

import { IEntityForm } from "./EntityForm.d";
import { IForm } from "../../../types.d";

import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().max(20, "Must be less than 20 symbols").required("Last name is required"),
  hobby: yup.string().required("Hobby is required"),
});

export const EntityForm = (props: IEntityForm) => {
  const history = useHistory();
  const { entityForEdit } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IForm>({
    defaultValues: entityForEdit,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (entityForEdit) {
      reset(entityForEdit);
    }
  }, [entityForEdit, reset]);

  const onSubmit = handleSubmit((data) => {
    if (!entityForEdit) {
      entityApi.createEntity(data).then(() => { 
        history.push("/");
      })
    } else {
      entityApi.editEntity(data).then(() => { 
        history.push("/");
      })
    }
  });
  return (
    <main>
      <form className="creation_form" onSubmit={onSubmit}>
        <h2>Entity {entityForEdit ? "editing" : "creation"}</h2>
        <Input
          {...register("firstName")}
          placeholder="first name"
          error={errors.firstName}
        />
        <Input
          {...register("lastName")}
          placeholder="last name"
          error={errors.lastName}
        />
        <Input
          {...register("hobby")}
          placeholder="hobby"
          error={errors.hobby}
        />
        <Button type="submit" value="Submit" />
      </form>
    </main>
  );
};
