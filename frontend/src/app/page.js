"use client";

import Image from "next/image";
import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import { useTheme } from "next-themes";
import { isUserValid } from "../../../backend/src/pocketbase";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <main className={theme === "dark" ? "dark" : "bg-whitebackground"}>
      <Header />
      <HomeSection />
    </main>
  );
}
