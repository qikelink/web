import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RightIcon } from "@/icons/RightIcon";

const SessionBar = ({ data }) => {
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonClick = (button) => {
    if (selectedButtons.includes(button)) {
      setSelectedButtons(selectedButtons.filter((item) => item !== button));
    } else {
      setSelectedButtons([...selectedButtons, button]);
    }
  };

  const handleScrollLeft = () => {
    const container = document.getElementById("sessionContainer");
    container.scrollLeft -= 100;
  };

  const handleScrollRight = () => {
    const container = document.getElementById("sessionContainer");
    container.scrollLeft += 100;
  };

  return (
    <div className="flex space-x-2 items-center">
      <div
        id="sessionContainer"
        className="flex py-2  gap-4 w-full overflow-x-scroll"
        style={{ "scrollbar-width": "thin" }}>
        {data.map((buttonText) => (
          <Button
            key={buttonText}
            variant="secondary"
            className={`w-fit font-medium text-sm text-darktext ${
              selectedButtons.includes(buttonText)
                ? "bg-primary text-secondary hover:bg-primary"
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

export default SessionBar;
