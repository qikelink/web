"use client";

import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import { isUserValid } from "../../../backend/src/pocketbase";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";

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
        <main className=" lg:px-5 ">
          <Header />
          <HomeSection />
        </main>
      )}
    </>
  );
}
