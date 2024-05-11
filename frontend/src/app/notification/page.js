"use client";

import Header from "@/components/Header";
import NotificationSection from "@/components/NotificationSection";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";

const page = () => {
  const [domLoaded, setDomLoaded] = useState(false);
  const { setProgress } = useAuth();

  useEffect(() => {
    setDomLoaded(true);
    setProgress(22);
  }, []);
  return (
    <>
      {domLoaded && (
        <main className="mx-2 lg:mx-4">
          <Header />
          <NotificationSection/>
        </main>
      )}
    </>
  );
};

export default page;
