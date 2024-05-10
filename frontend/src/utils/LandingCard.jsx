"use client";

import React from "react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/user-context";
import { useToast } from "@/components/ui/use-toast";
import { QikelinkLogo } from "@/icons/Qikelinklogo";
import { Button } from "@/components/ui/button";
import { CloudIcon } from "@/icons/CloudIcon";
import { PeopleIcon } from "@/icons/PeopleIcon";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import pic5 from "../../images/ment.png";
import Image from "next/image";
import { HiBars3BottomRight } from "react-icons/hi2";

const LandingCard = () => {
  const { mentor, mentors, setMentors, isLoading } = useUser();
  const { toast } = useToast();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmark, setBookmark] = useState([]);

  return (
    <>
      {/* section one  */}
      <section className="flex flex-col lg:justify-stretch space-y-12 font-jakarta bg-[#E6F2FF] h-screen lg:h-[716px]">
        {/* Beta highlight */}
        <div className="py-2 text-center bg-[#007AFF] ">
          <p className="text-sm text-white font-thin">
            Thanks for trying the beta version of Qikelink. Please let us know
            what we should work on to make it better! Submit your{" "}
            <a className="underline" href="/feedBack">
              feedback here
            </a>
          </p>
        </div>

        {/* Header  */}
        <div className="bg-[#FFFFFFCC] rounded-full py-4 px-4 lg:px-8 flex justify-between items-center w-[90%] lg:w-5/6 mx-auto">
          <div className="flex space-x-3">
            <div className="flex items-center">
              <QikelinkLogo />
              <p className="font-bold text-xl ml-2">Qikelink</p>
            </div>

            <Badge
              className="px-4 rounded-full bg-[#d6e7fa]"
              variant="secondary">
              Beta
            </Badge>
          </div>

          <div className="flex hidden lg:block space-x-3 items-center">
            <Button variant="ghost">About</Button>
            <Button variant="ghost">Contact us</Button>
            <Button size="lg">Get started</Button>
          </div>
          <div className="lg:hidden">
            <Button variant="outline" className="rounded-full border-black">
              <HiBars3BottomRight />
            </Button>
          </div>
        </div>

        {/* Hero section */}
        <div className="flex justify-between relative">
          {/* Hero cloud 1 */}
          <div className="w-1/5 mt-20 ">
            <CloudIcon />
          </div>

          {/* Hero Texts */}
          <div className="grid lg:grid-cols-2 w-5/6 px-2 absolute mx-auto top-0 right-0 left-0 z-10 ">
            {/* Header text */}
            <div>
              <div className="text-3xl text-center lg:text-left lg:text-6xl space-y-4 font-bold tracking-wide">
                <h2 className="text-[#5B5B5B] ">Unlock Your Potential</h2>
                <h2 className="text-[#1C1C1C]">with Qikelink </h2>
              </div>
              {/* Subheading text */}
              <p className="text-[#000000] text-left lg:text-center mt-12 text-base lg:text-xl w-fit font-thin">
                {" "}
                {/* Adjust width here */}
                Join Millions using Qikelink to offer mentorship to their
                audience or Access world-class mentorship for your personal
                growth anytime, anywhere.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap justify-center lg:space-y-4 space-x-4 mt-16">
                <Button size="xl" className="bg-[#007AFF] ">
                  <Button className="bg-white mr-2">
                    <FcGoogle />
                  </Button>{" "}
                  Claim your booking link
                </Button>
                <Button size="xl" className="bg-[#1C1C1C] px-10">
                  Browse mentors
                </Button>
              </div>
            </div>

            {/* Image section */}
            <div className="mt-12">
              <Image
                src={pic5}
                width={500}
                height={500}
                className="rounded-md"
                alt="Picture of the author"
              />
            </div>
          </div>

          {/* Hero cloud 2 */}
          <div className="w-1/5 -mt-14 ">
            <CloudIcon />
          </div>
        </div>
      </section>

      {/* section two  */}
      <section className=" flex space-x-4 justify-evenly items-center font-jakarta bg-[#FFF2E6] h-screen lg:h-[716px]">
        {/* Hero section */}

        {/* Hero cloud 1 */}
        <div className="w-1/5">
          <img src="/section2.svg" alt="Section 2 image 1" />
        </div>

        {/* Hero Texts */}
        <div className="flex flex-col space-y-6 items-center w-2/3">
          {/* Header text */}
          <p className="text-[#6B3600] text-lg font-thin">
            Discover mentorship
          </p>

          <div className="text-5xl space-y-4 text-center font-semibold">
            <p className="text-[#6B3600]">Connect With</p>
            <p className="text-[#6B3600]"> Industry Leaders</p>
          </div>
          {/* Subheading text */}
          <p className="text-[#1C1C1C] text-xl w-full text-center font-thin">
            {" "}
            {/* Adjust width here */}
            Join a vibrant community of seasoned content creators. Find the
            guidance you need to navigate challenges and accelerate your growth.
          </p>
        </div>

        {/* Hero cloud 2 */}
        <div className="w-1/5 ">
          <img src="/section2b.svg" alt="Section 2 image 2" />
        </div>
      </section>

      {/* section three  */}
      <section className=" flex flex-col  items-center  font-jakarta bg-[#E6F2FF] h-[full]">
        {/* Hero section */}

        {/* Top images */}
        <div className="flex justify-between items-center w-5/6 ">
          <img src="/section3a.svg" alt="Section 3 image 1" />
          <img src="/section3b.svg" alt="Section 3 image 2" />
        </div>

        {/* Hero Texts */}
        <div className="flex flex-col space-y-5 items-center w-2/3">
          {/* Header text */}
          <p className="text-[#007AFF] text-lg font-thin">Booking Made Easy</p>

          <div className="text-5xl space-y-4 text-center font-semibold">
            <p className="text-[#007AFF]">Book meet with any </p>
            <p className="text-[#007AFF]"> Mentor with ease</p>
          </div>
          {/* Subheading text */}
          <p className="text-[#1C1C1C] text-xl w-full text-center font-thin">
            {" "}
            Schedule live video sessions with experienced content creators at
            your convenience. Whether you need advice on video editing, product
            development, or marketing strategy, our platform makes it simple to
            connect with the right mentor for your needs.
          </p>
        </div>

        {/* Bottom images */}
        <div className="flex justify-between items-center w-5/6">
          <img src="/section3c.svg" alt="Section 3 image 3" />
          <img src="/section3d.svg" alt="Section 3 image 4" />
        </div>
      </section>

      {/* section four  */}
      <section className=" flex flex-col  items-center justify-center font-jakarta bg-[#00BA3E08] h-screen lg:h-[716px]">
        {/* Hero section */}

        {/* Top images */}
        <div className="flex justify-start items-center w-5/6 ">
          <img src="/section4a.svg" alt="Section 4 image 1" />
        </div>

        {/* Hero Texts */}
        <div className="flex flex-col space-y-5 items-center w-2/3">
          {/* Header text */}
          <p className="text-[#004015] text-lg font-thin">
            customise your booking link
          </p>

          <div className="text-5xl space-y-4 text-center font-semibold">
            <p className="text-[#004015]">Customize your Booking </p>
            <p className="text-[#004015]"> link/Page as you want</p>
          </div>
          {/* Subheading text */}
          <p className="text-[#1C1C1C] text-xl w-full text-center font-thin ">
            {" "}
            Schedule live video sessions with experienced content creators at
            your convenience. Whether you need advice on video editing, product
            development, or marketing strategy, our platform makes it simple to
            connect with the right mentor for your needs.
          </p>
        </div>

        {/* Bottom images */}
        <div className="flex justify-end items-center w-5/6">
          <img src="/section4b.svg" alt="Section 4 image 2" />
        </div>
      </section>

      {/* section five  */}
      <section className="flex flex-col items-center justify-center font-jakarta bg-[#F24E1E0D] h-screen lg:h-[716px]">
        {/* Hero section */}
        <div className="flex space-x-4 justify-evenly">
          {/* Hero cloud 1 */}
          <div className="w-1/5 hidden lg:block">
            <CloudIcon />
          </div>

          {/* Hero Texts */}
          <div className="flex flex-col space-y-5 items-center w-2/3">
            {/* Header text */}
            <p className="text-[#600000] text-lg font-thin">
              Join the Community
            </p>

            <div className="text-4xl lg:text-5xl space-y-4 text-center font-semibold">
              <p className="text-[#600000]">Become Part of </p>
              <div className="text-[#600000] flex flex-col space-x-2">
                <p> Something Bigger </p>
                <img src="/section5a.svg" alt="Section 5 image 1" />
              </div>
            </div>
            {/* Subheading text */}
            <p className="text-[#1C1C1C] text-xl w-full text-center font-thin ">
              {" "}
              Join Qikelink today and become part of a thriving community of
              entrepreneurs, content creators, and mentors. Together, we're
              shaping the future of content creation and empowering creators to
              achieve their goals
            </p>

            {/* CTA buttons */}
            <div className="mt-20">
              <Button size="lg" className="bg-[#007AFF]">
                Claim your booking link
              </Button>
            </div>
          </div>

          {/* Hero cloud 2 */}
          <div className="w-1/5 mr-12  hidden lg:block">
            <CloudIcon />
          </div>
        </div>
      </section>

      {/* section six  */}
      <section className="flex flex-col items-center justify-center font-jakarta bg-[#FBF6F54A] h-[716px]">
        {/* Hero section */}

        {/* Hero Texts */}
        <div className="flex flex-col space-y-5 items-center w-2/3">
          {/* Header text */}
          <p className="text-[#1C1C1C] text-lg font-thin">Onboarding for you</p>

          <div className="text-5xl space-y-4 text-center font-semibold">
            <p className="text-[#1C1C1C]">Explore qikelink </p>
          </div>
          {/* Subheading text */}
          <p className="text-[#1C1C1C] text-xl w-full text-center font-thin ">
            {" "}
            Watch our quick demo to learn more about qikelink.
          </p>

          {/* CTA buttons */}
          <div className="mt-20">
            <img src="/section6a.svg" alt="Section 6 image 1" />
          </div>
        </div>
      </section>

      {/* section seven  */}
      <section className="flex flex-col items-center justify-center font-jakarta bg-[#007AFF] h-[716px]">
        {/* Hero section */}

        {/* Hero Texts */}
        <div className="flex flex-col space-y-5 items-center w-2/3">
          {/* Header text */}
          <p className="text-[#E6F1FE] text-lg font-thin">Newsletter</p>

          <div className="text-5xl space-y-4 text-center font-semibold">
            <p className="text-[#E6F2FF]">Get latest with Qikelink </p>
            <p className="text-[#E6F2FF]"> Vibe, Join community </p>
          </div>
          {/* Subheading text */}
          <p className="text-[#E6F1FE] text-xl w-full text-center font-thin ">
            {" "}
            Subscribe to our newsletter to get weekly updates.
          </p>

          {/* CTA buttons */}
          <div className="mt-20 w-[40%] space-y-3">
            <Input
              placeholder="Enter your email"
              className="bg-white py-5 rounded-lg"></Input>
            <Button size="lg" className="bg-[#1C1C1C] px-10 w-full">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* section eight  */}
      <section className=" flex justify-center  space-x-4 items-center  font-jakarta bg-emerald-50 h-screen lg:h-[716px]">
        {/* Hero section */}

        <div className=" w-5/6 flex space-y-6 flex-wrap justify-center lg:justify-between items-center">
          {/* Hero Texts */}
          <div className="flex flex-col space-y-6 items-center lg:w-1/2 relative">
            <img src="/section2b.svg" alt="Section 2 image 2" />
            <div className=" absolute mx-auto left-0 right-0 text-5xl space-y-2 font-semibold">
              {/* Header text */}
              <p className="text-[#007AFF] lg:text-lg font-thin text-left">
                FAQs
              </p>

              <p className="text-[#007AFF] tracking-wide">
                We have answered a few questions you may have for us
              </p>

              {/* Subheading text */}
              <p className="text-[#007AFF] text-xl w-full font-thin text-left">
                {" "}
                Qikelinksupport@gmail.com
              </p>
            </div>
          </div>

          {/* Hero cloud 2 */}
          <div className="lg:w-1/2 w-full">
            <div className="px-4 border-2 rounded-md bg-[#e6e6e6]">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem
                  value="item-1"
                  className="bg-white p-2 my-3 border-0 rounded-md">
                  <AccordionTrigger>What is Qikelink?</AccordionTrigger>
                  <AccordionContent>
                    Schedule live video sessions with experienced content
                    creators at your convenience. Whether you need advice on
                    video editing, product development, or marketing strategy,
                    our platform makes it simple to connect with the right
                    mentor for your needs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-2"
                  className="bg-white p-2 my-3 border-0 rounded-md">
                  <AccordionTrigger>How To Book A Mentor?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that matches the other
                    components&apos; aesthetic.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-3"
                  className="bg-white p-2 my-3 border-0 rounded-md">
                  <AccordionTrigger>
                    How Can I Make Money with Qikelink?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it
                    if you prefer.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-4"
                  className="bg-white p-2 my-3 border-0 rounded-md">
                  <AccordionTrigger>
                    How Trusted is This Platform
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it
                    if you prefer.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-5"
                  className="bg-white p-2 my-3 border-0 rounded-md">
                  <AccordionTrigger>Do I Need Money To SignUp</AccordionTrigger>
                  <AccordionContent>
                    Yes. It&apos;s animated by default, but you can disable it
                    if you prefer.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* section nine  */}
      <section className=" flex flex-col space-y-4 py-8 items-center font-jakarta bg-[#E6F2FF] h-[245px]">
        {/* Footer section */}

        <div className="flex justify-between w-5/6">
          <div className="flex items-center">
            <QikelinkLogo />
            <p className="font-bold text-xl ml-2">Qikelink.com</p>
          </div>

          <div className="flex flex-col space-y-2" variant="secondary">
            <p className="text-lg">Stay in touch</p>
            <div className="flex space-x-2">
              <img src="/linkedin.svg" alt="Socials" />
              <img src="/x.svg" alt="Socials" />
              <img src="/instagram.svg" alt="Socials" />
              <img src="/discord.svg" alt="Socials" />
              <img src="/facebook.svg" alt="Socials" />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3 w-5/6">
          <p>Privacy policy</p>
          <p>Terms used</p>
          <Separator className="bg-[#B0D6FF] " />
          <p>© 2024, Qikelink. All rights reserved.</p>
        </div>
      </section>
    </>
  );
};

export default LandingCard;
