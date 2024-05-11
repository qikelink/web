import React from "react";
export const QikelinkLogo = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  label,
  ...props
}) => {
  return (
    <svg
      width={size || width || 25}
      height={size || height || 25}
      viewBox="0 0 30 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.0332 4L3.9332 25.0316"
        stroke="#007AFF"
        stroke-width="6.42632"
        stroke-linecap="round"
      />
      <path
        d="M26.1338 4L15.0338 25.0316"
        stroke="#007AFF"
        stroke-width="6.42632"
        stroke-linecap="round"
      />
    </svg>
  );
};
