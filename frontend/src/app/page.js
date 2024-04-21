"use client";

import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";
import { Xlogin, isUserValid } from "../../../backend/src/pocketbase";
import { useRouter } from "next/navigation";

export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false);
  const { setProgress, setIsUserValid } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setDomLoaded(true);
    setProgress(22);

    const searchParams = new URLSearchParams(window.location.search);
    const username = searchParams.get("username");
    const password = searchParams.get("password");

    const handleLogin = async () => {
      if (username && password && isUserValid === null) {
        await Xlogin(username, password, setIsUserValid).then(() => {
          window.location.reload();
        });
      } else if (username && password) {
        router.push("/");
      }
    };

    handleLogin();
  }, []);

  return (
    <>
      {domLoaded && (
        <main className=" lg:px-4 ">
          <Header />
          <HomeSection />
        </main>
      )}
    </>
  );
}
