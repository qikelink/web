"use client";

import Header from "@/components/Header";
import { useState, useEffect } from "react";
import ListSection from "@/utils/ListSection";
import ManagerList from "@/utils/ManagerList";
import MetricSection from "@/components/MetricSection";
import { useAuth } from "@/contexts/auth-context";
import { isUserValid } from "../../../../../backend/src/pocketbase";
import { BookmarkEmpty } from "@/components/emptystate/bookmarkEmpty";
import { Button } from "@/components/ui/button";

export default function page() {
  const [domLoaded, setDomLoaded] = useState(false);
  const { setProgress } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
    setProgress(22);
  }, []);

  //<MetricSection/>
  return (
    <>
      {domLoaded && (
        <main className="mx-2 lg:mx-4">
          <Header />
          <div className="min-h-screen relative  w-full flex flex-row py-1 overflow-contain">
            <div className="hidden md:inline w-1/4 ">
              <ListSection />
            </div>
            <div className="w-full md:w-3/4 flex flex-col px-1 overflow-y-auto custom-scrollbar">
              {isUserValid ? (
                <div className="w-full flex flex-col lg:flex-row flex-col-reverse">
                  <div className="w-full md:w-2/3">
                    <MetricSection />
                  </div>
                  <div className=" md:w-1/3 w-full">
                    <ManagerList />
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center h-full">
                  {/* Render BookmarkEmpty when no bookmarks exist */}
                  <BookmarkEmpty />
                </div>
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
