import ListSection from "@/utils/ListSection";
import React from "react";

import BookCard from "@/utils/BookCard";
import BookCard2 from "@/utils/BookCard2";

const BookComp = () => {
  return (
    <>
      <div className="h-screen relative flex flex-row  py-1 overflow-contain">
        <div className="hidden md:inline w-1/4 ">
          <ListSection />
        </div>
        <div className=" w-full md:w-3/4 flex flex-col px-1 overflow-y-auto custom-scrollbar">
          {/* <HomeCardSection /> */}
          <BookCard2 />
        </div>
      </div>
    </>
  );
};

export default BookComp;
