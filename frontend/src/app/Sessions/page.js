"use client";

import Header from "@/components/Header";
import SessionComp from "@/components/SessionComp";
import { useState, useEffect } from "react";

const page = () => {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <>
      {domLoaded && (
        <main>
          <Header />
          <SessionComp />
        </main>
      )}
    </>
  );
};

export default page;
