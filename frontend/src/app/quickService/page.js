"use client";

import Header from "@/components/Header";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import QuickSection from "@/components/QuickSection";

export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false);
  const { setProgress } = useAuth();

  useEffect(() => {
    setDomLoaded(true);
    setProgress(22);
  }, []);

  return (
    <>
      {domLoaded && (
        <main className="mx-2 lg:mx-4 ">
          <Header />
          <QuickSection />
        </main>
      )}
    </>
  );
}
