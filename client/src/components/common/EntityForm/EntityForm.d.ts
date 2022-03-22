export interface IForm {
  firstName: string;
  lastName: string;
  hobby: string;
  id?: number;
}

export interface IEntityForm {
  id?: string;
  entityForEdit?: IForm;
}
