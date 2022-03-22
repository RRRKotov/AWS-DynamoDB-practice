import React, { useEffect, useState } from "react";
import "./EntityTable.css";
import { TableProps } from "./EntityTable.d";
import { Button } from "../../../common/Button/Button";
import { tableFields } from "./TableFields";
import { useHistory } from "react-router-dom";
import { entityApi } from "../../../../api/entityApi";
import { IForm } from "../../../../types.d";


export const EntityTable = React.forwardRef<HTMLTableElement, TableProps>(
  () => {
    const history = useHistory();
    const [entityList, setEntityList] = useState<IForm[]>([]);
    const fetchEntities = async () => {
      const { data } = await entityApi.getEntities()
      setEntityList(data.Items)
    }
    useEffect(() => {
      fetchEntities()
    }, []);

    const editTheEntity = (id: IForm["id"]) => {
      history.push(`/editing/${ id }`);
    };

    const deleteTheEntity = (id: IForm["id"]) => { 
      entityApi.deleteEntity(id).then(() => {
        fetchEntities()
      })
    
    }

    return (
      <table className="table">
        <tbody className="table_body">
          <tr className="table_header">
            {tableFields.map((item) => {
              return <td key={item.id}>{item.fieldName}</td>;
            })}
          </tr>

          {entityList.map((item: IForm) => {
            const { id, firstName, lastName, hobby } = item;

            return (
              <tr className="table_row" key={id}>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{hobby || "—"}</td>
                <td>
                  <Button
                    onClick={() => {
                      editTheEntity(id);
                    }}
                    value="Edit"
                  />
                  <Button
                    onClick={() => { 
                      deleteTheEntity(id)
                    }}
                    value="Delete"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
);
