"use client";

import Image from "next/image";
import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";
import { isUserValid } from "../../../backend/src/pocketbase";


export default function Home() {
  return (
    <main className="">
      <Header />
      <div className="">
        <HomeSection />
      </div>
    </main>
  );
}
