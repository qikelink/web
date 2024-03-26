"use client";

import Header from "@/components/Header";
import { useState, useEffect } from "react";
import Bookmarks from "@/components/Bookmarks";
import { useAuth } from "@/contexts/auth-context";

export default function page() {
  const [domLoaded, setDomLoaded] = useState(false);
  const { setProgress } = useAuth();

  useEffect(() => {
    setDomLoaded(true);
    setProgress(22);
  }, []);
  return (
    <>
      {domLoaded && (
        <main className=" lg:mx-5">
          <Header />
          <Bookmarks />
        </main>
      )}
    </>
  );
}
