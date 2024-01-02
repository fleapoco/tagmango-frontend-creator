import { Switch } from 'antd';

const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

export const SwitchToggle = () => {
  return (
    <>
      <Switch defaultChecked onChange={onChange} />
    </>
  );
};
