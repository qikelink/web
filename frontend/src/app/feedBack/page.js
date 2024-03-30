"use client";

import Header from "@/components/Header";
import HelpSection from "@/components/HelpSection";
import FeedBackSection from "@/components/FeedBackSection";
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
        <main className=" lg:mx-4">
          <Header />
          <FeedBackSection />
        </main>
      )}
    </>
  );
};

export default page;
