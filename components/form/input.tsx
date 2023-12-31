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
  name?: string;
  type?:
    | "search"
    | "text"
    | "password"
    | "email"
    | "date"
    | "time"
    | "month"
    | "week"
    | "link"
    | "number";

  placeholder?: string;
  defaultValue?: string;
  variant?: "dark";
  addonAfter?: string;
  value?: string | number;
  dateTimeValue?: string | Date | number | null;
  icon?: React.ReactNode;
  required?: boolean;
  minDate?: string | Date | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => unknown;
  onTimeChange?: (time: any, timeString: string) => unknown;
  onDateChange?: (date: any, dateString: string) => unknown;
  defaultDate?: Dayjs;
  disabled?: boolean;
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
              currentDate! < dayjs(props.minDate).startOf("day")
            }
            name={props.name}
            value={
              props.dateTimeValue
                ? dayjs(props.dateTimeValue)
                : dayjs(props.value)
            }
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
            name={props.name}
            value={dayjs(props.dateTimeValue)}
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
            min={props.type === "number" ? 0 : ""}
            disabled={props.disabled}
            className={_className}
            defaultValue={props.defaultValue}
            id="label"
            value={props.value}
            name={props.name}
            addonAfter={props.addonAfter}
            size="large"
          />
        )}
      </div>
    </>
  );
};
