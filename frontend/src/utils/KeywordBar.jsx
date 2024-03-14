import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RightIcon } from "@/icons/RightIcon";

const KeywordBar = () => {
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
    <div className="flex my-2 space-y-3 space-x-2">
      <div
        id="buttonContainer"
        className="flex py-4 px-2 gap-4 w-full overflow-x-scroll"
        style={{ "scrollbar-width": "thin", overflow: "transparent" }}
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
            variant="secondary"
            className={`w-full font-medium text-lg ${
              selectedButtons.includes(buttonText)
                ? "bg-primary text-secondary hover:bg-primary"
                : ""
            }`}
            onClick={() => handleButtonClick(buttonText)}
          >
            {buttonText}
          </Button>
        ))}
      </div>
      <div className="py-1 justify-end ">
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
