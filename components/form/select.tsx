import { Select } from "antd";

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

interface Props {
  label?: string;
  options?: { value: string; label: string }[];
}

export const FormSelect = (props: Props) => {
  return (
    <div>
      <div className="form-group">
        {props.label ? <label htmlFor="label">{props.label}</label> : ""}

        <Select
          defaultValue="lucy"
          style={{ width: "100%", height: "42px" }}
          onChange={handleChange}
          options={props.options}
        />
      </div>
    </div>
  );
};
