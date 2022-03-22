import React, { useEffect } from "react";
import { useForm, useFormState } from "react-hook-form";
import "./EntityForm.css";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import { IForm, IEntityForm } from "./EntityForm.d";

import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().max(20, "Must be less than 20 symbols").required("Last name is required"),
  hobby: yup.string(),
});

export const EntityForm = (props: IEntityForm) => {
  const history = useHistory();
  const { entityForEdit } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
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

  const { dirtyFields } = useFormState({ control });

  // getting fields that were filled
  const filterFormData = (formData: IForm) => {
    const dirtyFieldsCopy = Object.assign(dirtyFields);
    (Object.keys(formData) as Array<keyof IForm>).forEach((k) => {
      if (!dirtyFieldsCopy[k]) {
        delete formData[k];
      }
    });
    return formData;
  };

  //getting fields that user changed
  const gettingChangedData = (formData: IForm) => {
    const filteredData = filterFormData(formData);
    entityForEdit &&
      (Object.keys(formData) as Array<keyof IForm>).forEach((k) => {
        if (entityForEdit[k] === filteredData[k]) {
          delete filteredData[k];
        }
      });
    return filteredData;
  };

  const onSubmit = handleSubmit((data) => {
    if (!entityForEdit) {
      axios.post("http://localhost:5000/creation", {
        newEntityData: filterFormData(data),
      });
      history.push("/");
    } else {
      const dataForPutRequest = gettingChangedData(data);
      dataForPutRequest.id = entityForEdit.id;
      axios.put("http://localhost:5000/editing", {
        changedEntityData: dataForPutRequest,
      });
      history.push("/");
    }
  });
  return (
    <main>
      <form className="creation_form" onSubmit={onSubmit}>
        <h2>Trainee {entityForEdit ? "editing" : "creation"}</h2>
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
