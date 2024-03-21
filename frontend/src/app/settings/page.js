"use client";

import Header from "@/components/Header";
import { useState, useEffect } from "react";
import Settings from "@/components/Settings";
import { useAuth } from "@/contexts/auth-context";

export default function page() {
  const [domLoaded, setDomLoaded] = useState(false);
  const { setIsUserValid, progress, setProgress } = useAuth();

  useEffect(() => {
    setDomLoaded(true);
    setProgress(0);
  }, []);
  return (
    <>
      {domLoaded && (
        <main className="mx-2 lg:mx-5">
          <Header />
          <Settings />
        </main>
      )}
    </>
  );
}
