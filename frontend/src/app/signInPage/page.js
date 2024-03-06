import React from "react";
import SignIn from "@/components/SignIn";
import Header from "@/components/Header";

const page = () => {
  return (
    <main className="">
      <Header />
      <div className="bg-white flex justify-center my-auto mx-auto">
        <SignIn />
      </div>
    </main>
  );
};

export default page;
