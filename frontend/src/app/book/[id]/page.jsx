"use client";

import BookComp from "@/components/BookComp";
import Header from "@/components/Header";
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
          <BookComp/>
        </main>
      )}
    </>
  );
};

export default page;
