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
    setProgress(22);
  }, []);
  return (
    <>
      {domLoaded && (
        <main className=" lg:mx-4">
          <Header />
          <Settings />
        </main>
      )}
    </>
  );
}
