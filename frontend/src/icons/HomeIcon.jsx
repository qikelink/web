import React from "react";
export const HomeIcon = ({
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
      height={size || height || 24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M21.33 8.00999L14.78 2.76999C13.5 1.74999 11.5 1.73999 10.23 2.75999L3.68002 8.00999C2.74002 8.75999 2.17002 10.26 2.37002 11.44L3.63002 18.98C3.92002 20.67 5.49002 22 7.20002 22H17.8C19.49 22 21.09 20.64 21.38 18.97L22.64 11.43C22.82 10.26 22.25 8.75999 21.33 8.00999Z"
        fill="#0A84FF"
      />
      <path
        d="M12.5 18.75C12.09 18.75 11.75 18.41 11.75 18V15C11.75 14.59 12.09 14.25 12.5 14.25C12.91 14.25 13.25 14.59 13.25 15V18C13.25 18.41 12.91 18.75 12.5 18.75Z"
        fill="#292D32"
      />
    </svg>
  );
};
