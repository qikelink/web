"use client";

import Header from "@/components/Header";
import OrganizationSection from "@/components/UpcomingSection";
import ListSection from "@/utils/ListSection";
import React from "react";

const page = () => {
  return (
    <main className="mx-2 lg:mx-4">
      <Header />
      <div className="bg-white flex justify-center">
        <div className="flex flex-row justify-center mx-12 w-full bg-white">
          <div className="w-1/4 text-black py-4">
            <ListSection />
          </div>

          <div className="text-black w-3/4 flex justify-center p-4">
            <OrganizationSection />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
