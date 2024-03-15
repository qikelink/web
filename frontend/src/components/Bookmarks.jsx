import BookmarkCard from "@/utils/BookmarkCard";
import ListSection from "@/utils/ListSection";

import React from "react";
import { BookmarkEmpty } from "./emptystate/bookmarkEmpty";
import { isUserValid } from "../../../backend/src/pocketbase";

const Bookmarks = () => {
  return (
    <div className="min-h-screen font-poppins w-full">
      <div className="flex flex-row  py-1">
        <div className="w-1/4 ">
          <ListSection />
        </div>
        <div className=" w-3/4 flex  flex-col px-1 ">
          {!isUserValid ? <BookmarkCard /> : <BookmarkEmpty />}
        </div>
      </div>
    </div>
  );
};

export default Bookmarks;
