"use client";

import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";
import { Xlogin, isUserValid } from "../../../backend/src/pocketbase";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false);
  const { setProgress, setIsUserValid } = useAuth();
  const router = useRouter();
  const {toast} = useToast();

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
        }).catch(() => {
          toast({
            title: "Invalid sign in link",
            description:
              "Invalid sign in link, please ensure the link is correct and try again.",
            variant: "destructive",
          });
        })
      } else if (username && password) {
        router.push("/");
      }
    };

    handleLogin();
  }, []);


  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: "About Us Page",
    description:
      "Information about DeFrankFurt Global and its mission and vision",
    url: "https://www.defrankfurtglobal.com/",
    mainEntityOfPage: {
      "@type": "AboutPage",
      name: "About DeFrankFurt Global",
      description: "Learn about DeFrankFurt Global and its mission and vision",
    },
    author: {
      "@type": "Organization",
      name: "DeFrankFurt Global",
      description: "Top-quality steel rods and iron sheets supplier",
      url: "https://www.defrankfurtglobal.com/",
      logo: "https://bafybeidgj5wql5ko4b3bldr3ldgupgexohhatp5gbpbc6mm4hqxhlrfoxm.ipfs.w3s.link/DeFrankfurt%20Global%20icon.png",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {domLoaded && (
        <main className=" lg:px-4 ">
          <Header />
          <HomeSection />
        </main>
      )}
    </>
  );
}
