import React, { useState } from "react";
import { useEffect } from "react";
import "./Input.css";
import { IInput } from "./Input.d";

export const Input = React.forwardRef<HTMLInputElement, IInput>(
  (props, ref) => {
    const [borderColor, setBorderColor] = useState({ borderColor: "black" });

    useEffect(() => {
      props.error
        ? setBorderColor({ borderColor: "red" })
        : setBorderColor({ borderColor: "black" });
    }, [props.error]);
    return (
      <>
        <input
          style={borderColor}
          className={props.type ? "" : "input"}
          {...props}
          ref={ref}
          autoComplete="off"
          type={props.type ? props.type : "text"}
          id={props.id}
        ></input>
        {props.type === "checkbox" ? (
          <label htmlFor="isStudent">Student</label>
        ) : null}
        <p className="paragraph">{props?.error?.message}</p>
      </>
    );
  }
);
