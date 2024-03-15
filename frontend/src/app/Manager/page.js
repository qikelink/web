"use client";

import Header from "@/components/Header";
import { useState, useEffect } from "react";
import ManagerSection from "@/components/ManagerSection";

export default function page() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);
  return (
    <>
      {domLoaded && (
        <main className="mx-5">
          <Header />
          <ManagerSection />
        </main>
      )}
    </>
  );
}
