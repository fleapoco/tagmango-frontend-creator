import React from "react";

import type { DatePickerProps } from "antd";
import { DatePicker, Input, TimePicker } from "antd";
import dayjs from "dayjs";
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
  value?: string | number;
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  onTimeChange?: (time: any, timeString: string) => unknown;
  onDateChange?: (date: any, dateString: string) => unknown;
}

export const FormInput = (props: Props) => {
  return (
    <>
      <div className="form-group">
        {props.label ? <label htmlFor="label">{props.label}</label> : ""}

        {props.type === "date" ? (
          <DatePicker
            onChange={(date, dateString) =>
              props.onDateChange?.(date, dateString)
            }
            style={{ width: "100%", padding: "7.5px 12px" }}
          />
        ) : props.type === "time" ? (
          <TimePicker
            style={{ width: "100%", padding: "7.5px 12px" }}
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            onChange={(time, timeString) =>
              props.onTimeChange?.(time, timeString)
            }
          />
        ) : props.type === "month" ? (
          <DatePicker
            picker="month"
            style={{ width: "100%", padding: "7.5px 12px" }}
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
            type={props.type}
            id="label"
            value={props.value}
            style={{ padding: "7.5px 12px" }}
          />
        )}
      </div>
    </>
  );
};
