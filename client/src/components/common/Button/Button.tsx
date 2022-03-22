import React from "react";
import "./Button.css";

type buttonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: buttonProps) => {
  return (
    <button className="button" {...props}>
      {props.value}
    </button>
  );
};
