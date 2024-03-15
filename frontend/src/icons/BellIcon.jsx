import React from "react";
export const BellIcon = ({
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
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.5892 7.33027C15.5892 8.37688 15.8659 8.99376 16.4746 9.70465C16.9359 10.2284 17.0834 10.9007 17.0834 11.63C17.0834 12.3585 16.844 13.0501 16.3645 13.6116C15.7367 14.2847 14.8513 14.7144 13.9477 14.7891C12.6383 14.9008 11.3281 14.9948 10.0004 14.9948C8.67197 14.9948 7.36256 14.9385 6.05315 14.7891C5.14873 14.7144 4.26337 14.2847 3.63641 13.6116C3.15687 13.0501 2.91669 12.3585 2.91669 11.63C2.91669 10.9007 3.06494 10.2284 3.52543 9.70465C4.15322 8.99376 4.41162 8.37688 4.41162 7.33027V6.97524C4.41162 5.57361 4.76113 4.65709 5.48085 3.75988C6.55091 2.4514 8.26615 1.66666 9.96316 1.66666H10.0377C11.7712 1.66666 13.5419 2.48917 14.5937 3.85388C15.2762 4.73263 15.5892 5.61054 15.5892 6.97524V7.33027ZM7.5614 16.7174C7.5614 16.2977 7.94652 16.1055 8.30266 16.0233C8.71925 15.9351 11.2577 15.9351 11.6743 16.0233C12.0305 16.1055 12.4156 16.2977 12.4156 16.7174C12.3949 17.1169 12.1605 17.4711 11.8367 17.696C11.4168 18.0233 10.924 18.2306 10.4088 18.3053C10.1239 18.3423 9.84397 18.3431 9.569 18.3053C9.05302 18.2306 8.56023 18.0233 8.14115 17.6952C7.81649 17.4711 7.58211 17.1169 7.5614 16.7174Z"
        fill="#808191"
      />
    </svg>
  );
};
