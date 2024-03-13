import React from "react";
export const SearchIcon = ({
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
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M12 21C17.2467 21 21.5 16.7467 21.5 11.5C21.5 6.25329 17.2467 2 12 2C6.75329 2 2.5 6.25329 2.5 11.5C2.5 16.7467 6.75329 21 12 21Z"
        fill="#292D32"
      />
      <path
        d="M21.8 22C21.62 22 21.44 21.93 21.31 21.8L19.45 19.94C19.18 19.67 19.18 19.23 19.45 18.95C19.72 18.68 20.16 18.68 20.44 18.95L22.3 20.81C22.57 21.08 22.57 21.52 22.3 21.8C22.16 21.93 21.98 22 21.8 22Z"
        fill="#292D32"
      />
    </svg>
  );
};
