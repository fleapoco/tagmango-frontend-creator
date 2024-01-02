import { Input } from 'antd';

const { TextArea } = Input;

export interface TextArea {
  placeholder: string;
}

export const FormTextArea: React.FC<TextArea> = ({ placeholder }) => {
  return (
    <>
      <TextArea rows={4} placeholder={placeholder} maxLength={6} />
    </>
  );
};
