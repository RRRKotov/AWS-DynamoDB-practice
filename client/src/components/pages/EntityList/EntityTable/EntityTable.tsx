import React, { useEffect, useState } from "react";
import "./EntityTable.css";
import axios from "axios";
import { TableProps } from "./EntityTable.d";
import { Button } from "../../../common/Button/Button";
import { tableFields } from "./TableFields";
import { useHistory } from "react-router-dom";
import { IForm } from "../../../common/EntityForm/EntityForm.d";

export const EntityTable = React.forwardRef<HTMLTableElement, TableProps>(
  () => {
    const history = useHistory();
    const [entityList, setEntityList] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:5000/getentitylist").then((response) => {
        setEntityList(response.data);
      });
    }, []);

    const EditTheEntity = (id: number) => {
      history.push(`/editing/${id}`);
    };

    return (
      <table className="table">
        <tbody className="table_body">
          <tr className="table_header">
            {tableFields.map((item) => {
              return <td key={item.id}>{item.fieldName}</td>;
            })}
          </tr>

          {entityList.map((item: Required<IForm>) => {
            const { id, firstName, lastName, hobby } = item;

            return (
              <tr className="table_row" key={id}>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{hobby || "—"}</td>
                <td>
                  <Button
                    onClick={() => {
                      EditTheEntity(id);
                    }}
                    value="Edit"
                  />
                  <Button
                    onClick={() => {
                      console.log(id);
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
