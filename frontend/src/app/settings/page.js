"use client";

import Header from "@/components/Header";
import { useState, useEffect } from "react";
import Settings from "@/components/Settings";

export default function page () {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <>
      {domLoaded && (
        <main className="mx-2 lg:mx-5">
          <Header />
          <Settings/>
        </main>
      )}
    </>
  );
}
