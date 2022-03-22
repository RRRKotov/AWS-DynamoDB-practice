import { FieldErrors } from "react-hook-form";
export interface IInput {
  placeholder: string;
  defaultValue?: string;
  register?: function;
  name?: string;
  error?: FieldErrors;
  type?: string;
  id?: string;
}
