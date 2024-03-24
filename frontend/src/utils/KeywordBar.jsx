import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RightIcon } from "@/icons/RightIcon";
import { useUser } from "@/contexts/user-context";

const KeywordBar = ({ data }) => {
  const { selectedButtons, setSelectedButtons } = useUser();

  useEffect(() => {
    if (data.length > 0) {
      setSelectedButtons(data[0]);
    }
  }, [data]);

  const handleButtonClick = (button) => {
    setSelectedButtons(button);
  };

  const handleScrollLeft = () => {
    const container = document.getElementById("buttonContainer");
    container.scrollLeft -= 100;
  };

  const handleScrollRight = () => {
    const container = document.getElementById("buttonContainer");
    container.scrollLeft += 100;
  };


  return (
    <div className="flex pb-1 space-x-2 w-full">
      <div
        id="buttonContainer"
        className="flex gap-4 w-full overflow-x-scroll custom-scrollbar">
        {data.map((buttonText, index) => (
          <Button
            key={buttonText}
            variant="secondary"
            className={`w-fit font-medium text-base hover:bg-blue  ${
              selectedButtons === buttonText
                ? "bg-blue text-secondary "
                : index === 0
                ? " text-primary"
                : ""
            }`}
            onClick={() => handleButtonClick(buttonText)}>
            {buttonText}
          </Button>
        ))}
      </div>
      <div className=" justify-end ">
        <Button
          variant="secondary"
          size="icon"
          aria-label="more keywords"
          onClick={handleScrollRight}>
          <RightIcon />
        </Button>
      </div>
    </div>
  );
};

export default KeywordBar;
