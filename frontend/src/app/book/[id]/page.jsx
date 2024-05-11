"use client";

import BookComp from "@/components/BookComp";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";

export const runtime = "edge";

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
          <BookComp/>
        </main>
      )}
    </>
  );
};

export default page;
