import { Select } from "antd";
import React from "react";

interface Props {
  label?: string;
  value?: string | null;
  options?: { value: string; label: string }[];
  handleChange: (value: string) => void;
}

export const FormSelect: React.FC<Props> = (props: Props) => {
  return (
    <div>
      <div className="form-group">
        {props.label ? <label htmlFor="label">{props.label}</label> : ""}
        <Select
          value={props.value}
          style={{ width: "100%", height: "42px" }}
          onChange={(value) => props.handleChange(value)}
          options={props.options}
        />
      </div>
    </div>
  );
};
