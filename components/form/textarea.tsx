import { Input } from "antd";

const { TextArea } = Input;

export interface TextArea {
  placeholder: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => unknown;
}

export const FormTextArea: React.FC<TextArea> = ({
  placeholder,
  name,
  onChange,
}) => {
  return (
    <>
      <TextArea
        name={name}
        rows={4}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e)}
        // maxLength={6}
      />
    </>
  );
};
