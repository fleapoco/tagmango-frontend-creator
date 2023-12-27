import React from "react";

import type { DatePickerProps } from "antd";
import { DatePicker, Input, TimePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  console.log(date, dateString);
};

interface Props {
  label?: string;
  type?:
    | "search"
    | "text"
    | "password"
    | "email"
    | "date"
    | "time"
    | "month"
    | "week"
    | "number";
  placeholder?: string;
  variant?: "dark";
  value?: string | number;
  icon?: React.ReactNode;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  onTimeChange?: (time: any, timeString: string) => unknown;
  onDateChange?: (date: any, dateString: string) => unknown;
  defaultDate?: Dayjs;
}

export const FormInput = (props: Props) => {
  let _className = "";

  if (props.variant === "dark") _className += "dark-variant-input ";
  else _className += "";

  return (
    <>
      <div className="form-group">
        {props.label ? <label htmlFor="label">{props.label}</label> : ""}

        {props.type === "date" ? (
          <DatePicker
            allowClear={false}
            disabledDate={(currentDate: dayjs.ConfigType) =>
              currentDate! < dayjs().startOf("day")
            }
            value={dayjs(props.value)}
            onChange={(date, dateString) => {
              props.onDateChange?.(date, dateString);
            }}
            style={{ width: "100%", padding: "7.5px 12px" }}
          />
        ) : props.type === "time" ? (
          <TimePicker
            defaultValue={dayjs(props.value)}
            format="h:mm A"
            allowClear={false}
            style={{ width: "100%", padding: "7.5px 12px" }}
            onChange={(time, timeString) => {
              props.onTimeChange?.(time, timeString);
            }}
          />
        ) : props.type === "month" ? (
          <DatePicker
            allowClear={false}
            picker="month"
            value={dayjs(props.value)}
            style={{ width: "100%", padding: "7.5px 12px" }}
            onChange={(date, dateString) => {
              props.onDateChange?.(date, dateString);
            }}
          />
        ) : props.type === "week" ? (
          <DatePicker
            picker="week"
            style={{ width: "100%", padding: "7.5px 12px" }}
          />
        ) : (
          <Input
            placeholder={props.placeholder}
            onChange={(e) => props.onChange?.(e)}
            prefix={props.icon}
            required={props.required ? props.required : false}
            type={props.type}
            className={_className}
            id="label"
            value={props.value}
            style={{ padding: "7.5px 12px" }}
          />
        )}
      </div>
    </>
  );
};
