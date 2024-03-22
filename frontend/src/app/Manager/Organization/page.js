"use client";

import Header from "@/components/Header";
import { useState, useEffect } from "react";
import ListSection from "@/utils/ListSection";
import ManagerList from "@/utils/ManagerList";
import OrganizationSection from "@/components/OrganizationSection";
import { useAuth } from "@/contexts/auth-context";
import { isUserValid } from "../../../../../backend/src/pocketbase";
import { BookmarkEmpty } from "@/components/emptystate/bookmarkEmpty";

export default function page() {
  const [domLoaded, setDomLoaded] = useState(false);
  const { setProgress } = useAuth();

  useEffect(() => {
    setDomLoaded(true);
    setProgress(0);
  }, []);
  return (
    <>
      {domLoaded && (
        <main className="mx-5">
          <Header />
          <div className="min-h-screen font-poppins w-full">
            <div className="flex flex-row py-1">
              <div className="w-1/4 ">
                <ListSection />
              </div>
              <div className=" w-3/4 flex flex-col px-1 ">
                {isUserValid ? (
                  <div className="w-full flex flex-row">
                    <div className="w-2/3">
                      <OrganizationSection />
                    </div>
                    <div className="w-1/3">
                      <ManagerList />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    {/* Render BookmarkEmpty when no bookmarks exist */}
                    <BookmarkEmpty/>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
