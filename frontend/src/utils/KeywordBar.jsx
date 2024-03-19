import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RightIcon } from "@/icons/RightIcon";

const KeywordBar = ({ data }) => {
  const [selectedButtons, setSelectedButtons] = useState(["All"]);

  const handleButtonClick = (button) => {
    if (selectedButtons.includes(button)) {
      setSelectedButtons(selectedButtons.filter((item) => item !== button));
    } else {
      setSelectedButtons([...selectedButtons, button]);
    }
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
    <div className="flex my-3 space-x-2 w-full">
      <div
        id="buttonContainer"
        className="flex px-2 gap-4 w-full overflow-x-scroll custom-scrollbar"
      >
        {data.map((buttonText, index) => (
          <Button
            key={buttonText}
            variant="secondary"
            className={`w-fit font-medium text-base ${
              selectedButtons.includes(buttonText)
                ? "bg-primary text-secondary hover:bg-green "
                : index === 0
                ? "bg-blue text-white "
                : ""
            }`}
            onClick={() => handleButtonClick(buttonText)}
          >
            {buttonText}
          </Button>
        ))}
      </div>
      <div className=" justify-end ">
        <Button
          variant="secondary"
          size="icon"
          aria-label="more keywords"
          onClick={handleScrollRight}
        >
          <RightIcon />
        </Button>
      </div>
    </div>
  );
};

export default KeywordBar;
