"use client"

import Image from "next/image";
import Header from "@/components/Header";
import HomeSection from "@/components/HomeSection";



export default function Home() {
  return (
    <main className="">
    <Header/> 
    <div className="bg-white flex justify-center">
         <HomeSection/>
 
    </div>
    </main>
  );
}
