"use client";

import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";


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
        <main className="px-2 lg:px-4 ">
          <Header />
          <HomeSection />
        </main>
      )}
    </>
  );
}
