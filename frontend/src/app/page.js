"use client";

import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import { isUserValid } from "../../../backend/src/pocketbase";

export default function Home() {


  return (
    <main>
      <Header />
      <HomeSection />
    </main>
  );
}
