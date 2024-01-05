import { Switch } from "antd";

// const onChange = (checked: boolean) => {
//   console.log(`switch to ${checked}`);
// };

type SwitchToggleType = {
  onChange?: (checked: boolean) => void;
  value?: boolean;
};

export const SwitchToggle = ({ onChange, value }: SwitchToggleType) => {
  return (
    <>
      <Switch checked={value} onChange={onChange} />
    </>
  );
};
