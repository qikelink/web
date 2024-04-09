import { useUser } from "@/contexts/user-context";
import ListSection from "@/utils/ListSection";
import React from "react";

const NotificationSection = () => {
    const {notifications} = useUser();
  return (
    <div className="h-screen relative flex flex-row  py-1 overflow-contain">
      <div className="hidden md:inline w-1/4 ">
        <ListSection />
      </div>
      <div className=" w-full md:w-3/4 flex flex-col px-1 overflow-y-auto custom-scrollbar">
        <div className="p-8 bg-secondary">
          <h1 className="text-2xl font-semibold mb-4">Messages</h1>
          <div className="absolute  md:top-0 md:right-9 md:w-96 bg-white border border-gray-300 rounded-md mt-1 overflow-hidden shadow-lg">
            {notifications && notifications.items.length > 0 ? (
              notifications.items.map((item, index) => (
                <div
                  className="flex items-center justify-between px-4 py-2 border-b cursor-pointer border-gray-300"
                  onClick={() => router.push("/sessions")}
                  key={index}
                >
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue rounded-full mr-2"></div>
                    <div>
                      <p className="text-base font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-600">{item.message}</p>
                    </div>
                  </div>

                  {/* <Badge variant='secondary' >Clear</Badge> */}
                </div>
              ))
            ) : (
              <div className="flex flex-col  items-center w-full h-full my-16">
                <EmptyIcon size={120} />
                <p className="text-center text-lg font-medium text-darktext">
                  No notification to show.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;
