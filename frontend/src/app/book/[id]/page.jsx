"use client";

import BookComp from "@/components/BookComp";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/auth-context";
import BookCard2 from "@/utils/BookCard2";
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
          <main className=" ">
          <BookCard2/>
        </main>
      )}
    </>
  );
};

export default page;
