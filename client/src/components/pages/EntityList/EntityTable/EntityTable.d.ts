import { IForm } from "../../../common/EntityForm/EntityForm";
export type Entities = {
  Entities: IForm[];
};

export type EntityTable = Required<IForm>


export type TableProps = React.TableHTMLAttributes<HTMLTableElement>;
