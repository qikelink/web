import KeywordBar from "@/utils/KeywordBar";
import ListSection from "@/utils/ListSection";
import SessionCard from "@/utils/SessionCard";
import React from "react";
import { BookmarkEmpty } from "./emptystate/bookmarkEmpty";
import { isUserValid } from "../../../backend/src/pocketbase";


const SessionComp = () => {
  return (
    <>
      <div className="h-screen relative flex flex-row  py-1 overflow-contain">
        <div className="hidden md:inline w-1/4 ">
          <ListSection />
        </div>
        <div className=" w-full md:w-3/4 flex flex-col px-1 overflow-y-auto custom-scrollbar">
          {/* <HomeCardSection /> */}
          {isUserValid ? (
            <SessionCard />
          ) : (
            <div className="flex justify-center items-center h-full">
              {/* Render BookmarkEmpty when no bookmarks exist */}
              <BookmarkEmpty />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SessionComp;
