"use client";

import Header from "@/components/Header";
import { useState, useEffect } from "react";
import ProfileSection from "@/components/ProfileSection";

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
          <ProfileSection />
        </main>
      )}
    </>
  );
}
