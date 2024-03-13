import React, { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { RightIcon } from "@/icons/RightIcon";

const KeywordBar = () => {
  const [selectedButtons, setSelectedButtons] = useState([]);

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
    <div>
      <div className="flex justify-end ">
        <Button
          size="sm"
          isIconOnly
          aria-label="more keywords"
          onClick={handleScrollRight}
        >
          <RightIcon />
        </Button>
      </div>

      <div
        id="buttonContainer"
        className="flex py-4 gap-4 w-full overflow-x-auto"
      >
        {[
          "All",
          "Tech",
          "Youtuber",
          "StartUps",
          "Personal Development",
          "Education",
          "Psychology",
          "Business",
          "Career",
          "Design",
          "Lifestyle",
        ].map((buttonText) => (
          <Button
            key={buttonText}
            variant="flat"
            className={`w-[120px] font-medium text-lg ${
              selectedButtons.includes(buttonText)
                ? "bg-primary text-white"
                : ""
            }`}
            onClick={() => handleButtonClick(buttonText)}
          >
            {buttonText}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default KeywordBar;
