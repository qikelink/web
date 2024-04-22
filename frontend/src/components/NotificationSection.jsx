import { useUser } from "@/contexts/user-context";
import { EmptyIcon } from "@/icons/EmptyIcon";
import ListSection from "@/utils/ListSection";
import { useRouter } from "next/navigation";
import React from "react";

const NotificationSection = () => {
  const { user, notifications } = useUser();
  const router = useRouter();

  return (
    <div className="h-screen relative flex flex-row  py-1 overflow-contain">
      <div className="hidden md:inline w-1/4 ">
        <ListSection />
      </div>
      <div className=" w-full md:w-3/4 flex flex-col px-1 overflow-y-auto custom-scrollbar">
        <div className="p-2">
          <h1 className="text-2xl font-semibold mb-4">Messages</h1>
          <div className="">
            {notifications &&
            notifications.items &&
            notifications.items.length > 0 ? (
              notifications.items.map((item, index) => (
                <div
                  className="flex items-center justify-between px-4 py-2 border rounded-lg cursor-pointer border-gray-300 my-2"
                  onClick={() => router.push("/sessions")}
                  key={index}
                >
                  <div className="flex items-center">
                    <div className="w-3 h-2 bg-blue rounded-full mr-4"></div>
                    <div>
                      <p className="text-base font-semibold">{item.title}</p>
                      <p className="text-sm text-gray-600">
                        {user.id === item.owner
                          ? item.messageSender
                          : item.messageReceiver}
                      </p>
                    </div>
                  </div>

                  {/* <Badge variant='secondary' >Clear</Badge> */}
                </div>
              ))
            ) : (
              <div className="flex flex-col  items-center w-full h-full my-28">
                <EmptyIcon size={150} />
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
