import { Button } from "antd";
import React from "react";

interface ButtonProps {
  text: React.ReactNode;
  variant: "primary" | "secondary" | "info" | "dark";
  onClick?: () => void;
  loading?: boolean;
}

export const PrimaryButton = ({
  text,
  variant,
  onClick,
  loading = false,
}: ButtonProps) => {
  const ChangeType = variant === "primary" ? "primary" : "text";

  let buttonClass = "";
  let InfoIcon = null;

  if (variant === "info") {
    InfoIcon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M14 6C14 7.105 13.105 8 12 8C10.895 8 10 7.105 10 6C10 4.895 10.895 4 12 4C13.105 4 14 4.895 14 6Z"
          fill="#1C2E45"
        />
        <path
          d="M14 12C14 13.105 13.105 14 12 14C10.895 14 10 13.105 10 12C10 10.895 10.895 10 12 10C13.105 10 14 10.895 14 12Z"
          fill="#1C2E45"
        />
        <path
          d="M14 18C14 19.105 13.105 20 12 20C10.895 20 10 19.105 10 18C10 16.895 10.895 16 12 16C13.105 16 14 16.895 14 18Z"
          fill="#1C2E45"
        />
      </svg>
    );
  }

  switch (variant) {
    case "dark":
      buttonClass = "site-btn dark-btn";
      break;

    case "secondary":
      buttonClass = "site-btn gray-btn";
      break;

    case "info":
      buttonClass = "site-btn into-btn";
      break;

    default:
      buttonClass = "site-btn";
  }

  return (
    <>
      <Button
        loading={loading}
        type={ChangeType}
        className={buttonClass}
        onClick={onClick}
      >
        {InfoIcon}
        {text}
      </Button>
    </>
  );
};
