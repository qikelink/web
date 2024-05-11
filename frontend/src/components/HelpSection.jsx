import ListSection from "@/utils/ListSection";
import React from "react";

const HelpSection = () => {
  return (
    <div className="h-screen relative flex flex-row  py-1 overflow-contain">
      <div className="hidden md:inline w-1/4 ">
        <ListSection />
      </div>
      <div className=" w-full md:w-3/4 flex flex-col px-2 overflow-y-auto custom-scrollbar">
        <div className="p-8 bg-secondary rounded-md">
          <h1 className="text-2xl font-semibold mb-4">Help Desk</h1>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              What does our company do?
            </h2>
            <p className="text-gray-700">
              Our company is developing a platform for connecting individuals
              and enterprises with mentors for one on one sessions. Similar to
              YouTube's model, it involves a rating system based on demand and
              features a user-friendly interface for booking and conducting
              sessions.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              How does the platform work?
            </h2>
            <p className="text-gray-700">
              The platform allows users to browse through a curated list of
              mentors, view their profiles, ratings, and expertise areas. Users
              can then book one on one sessions with their preferred mentors at
              their convenience. The sessions are conducted virtually through
              the platform, offering a seamless and secure experience for both
              mentors and users.
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              What features does the platform offer?
            </h2>
            <p className="text-gray-700">
              The platform offers a range of features including:
              <ul className="list-disc list-inside">
                <li>
                  User-friendly interface for browsing and booking advisory
                  sessions
                </li>
                <li>Rating system based on user feedback and demand</li>
                <li>Secure payment processing for paid sessions</li>
                <li>
                  Virtual session capabilities for remote one on one sessions
                </li>
                <li>Profile customization options for mentors</li>
                <li>Advanced search filters for finding specific mentors</li>
              </ul>
            </p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">
              How can I get started?
            </h2>
            <p className="text-gray-700">
              To get started, simply sign up for an account on our platform.
              Once registered, you can start browsing through our list of
              mentors, view their profiles, and book sessions based on your
              preferences and availability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
