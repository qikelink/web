"use client";

import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import { isUserValid } from "../../../backend/src/pocketbase";
import { useState, useEffect } from "react";

export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <>
      {domLoaded && (
        <main className=" mx-2 lg:mx-5 ">
          <Header />
          <HomeSection />
        </main>
      )}
    </>
  );
}
