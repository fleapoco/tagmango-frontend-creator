import { Input } from "antd";

const { TextArea } = Input;

export interface TextArea {
  placeholder: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => unknown;
}

export const FormTextArea: React.FC<TextArea> = ({
  placeholder,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <TextArea
        name={name}
        value={value}
        rows={4}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e)}
        // maxLength={6}
      />
    </>
  );
};
