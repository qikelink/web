"use client";

import { useAuth } from "@/contexts/auth-context";
import { useState, useEffect } from "react";
import { Xlogin, isUserValid } from "../../../backend/src/pocketbase";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import LandingSection from "@/components/LandingSection";

export default function Home() {
  const [domLoaded, setDomLoaded] = useState(false);
  const { setProgress, setIsUserValid } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    setDomLoaded(true);
    setProgress(22);

    const searchParams = new URLSearchParams(window.location.search);
    const username = searchParams.get("username");
    const password = searchParams.get("password");

    const handleLogin = async () => {
      if (username && password && isUserValid === null) {
        await Xlogin(username, password, setIsUserValid)
          .then(() => {
            window.location.reload();
          })
          .catch(() => {
            toast({
              title: "Invalid sign in link",
              description:
                "Invalid sign in link, please ensure the link is correct and try again.",
              variant: "destructive",
            });
          });
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
      "Information about Qikelink and its mission and vision",
    url: "https://www.qikelink.com/",
    mainEntityOfPage: {
      "@type": "AboutPage",
      name: "About Qikelink",
      description: "Learn about Qikelink and its mission and vision",
    },
    author: {
      "@type": "Organization",
      name: "Qikelink",
      description: "Qikelink is a platform for individuals seeking mentorship and experienced content creators and industry leaders",
      url: "https://www.qikelink.com/",
      logo: "https://bafkreif7fy6ndk7v7zqpmcbsngr5fnohjgvdpappfr7r3c33h6ie7oda7a.ipfs.nftstorage.link/",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {domLoaded && (
        <main className=" ">
          <LandingSection />
        </main>
      )}
    </>
  );
}
