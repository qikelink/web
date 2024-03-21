import clsx from "clsx";

const GridContainer = ({ children, className }) => {
  return (
    <div
      className={clsx(
        "bg-gray-800 relative w-[49%] rounded-lg flex flex-col items-center justify-center",
        className
      )}>
      {children}
    </div>
  );
};

export default GridContainer;
