"use client";

import Header from "@/components/Header";
import { useState, useEffect } from "react";
import ListSection from "@/utils/ListSection";
import ManagerList from "@/utils/ManagerList";
import { isUserValid } from "../../../../../backend/src/pocketbase";
import { useAuth } from "@/contexts/auth-context";
import SettingCard from "@/utils/SettingCard";
import { BookmarkEmpty } from "@/components/emptystate/bookmarkEmpty";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUser } from "@/contexts/user-context";

export default function page() {
  const [domLoaded, setDomLoaded] = useState(false);
  const { setProgress } = useAuth();
  const { mentor } = useUser();

  useEffect(() => {
    setDomLoaded(true);
    setProgress(22);
  }, []);

  //  <RequestSection/>
  return (
    <>
      {domLoaded && (
        <main className="mx-2 lg:mx-4">
          <Header />
          <div className="min-h-screen relative font-poppins w-full flex flex-row py-1 overflow-contain">
            <div className="hidden md:inline w-1/4 ">
              <ListSection />
            </div>
            <div className="w-full md:w-3/4 flex flex-col px-1 overflow-y-auto custom-scrollbar">
              {isUserValid ? (
                <div className="w-full flex md:flex-row flex-col-reverse">
                  <div className="w-full md:w-2/3 flex flex-col space-y-2 px-2">
                    {!mentor.verified && (
                      <Alert variant="destructive">
                        <AlertTitle>Complete Setup </AlertTitle>
                        <AlertDescription>
                          Verify your profile to complete setup and start earning as a mentor.
                        </AlertDescription>
                      </Alert>
                    )}

                    <SettingCard />
                  </div>
                  <div className=" md:w-1/3 w-full px-2">
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
