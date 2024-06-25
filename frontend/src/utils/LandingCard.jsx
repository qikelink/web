"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/contexts/user-context";
import { useToast } from "@/components/ui/use-toast";
import { QikelinkLogo } from "@/icons/Qikelinklogo";
import { Button } from "@/components/ui/button";
import { CloudIcon } from "@/icons/CloudIcon";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Menubar,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import pic5 from "../../images/elon_ada.png";
import Image from "next/image";
import { HiBars3BottomRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { Subscribe, isUserValid } from "../../../backend/src/pocketbase";
import { AiFillDollarCircle } from "react-icons/ai";

const LandingCard = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const handleBrowse = () => {
    router.push("/mentors");
  };

  const handleClaim = () => {
    if (isUserValid) {
      router.push("/settings");
    } else {
      router.push("/get-started");
    }
  };

  const handleContact = () => {
    const recipientEmail = "support@qikelink.com";
    const subject = "Contact Us";

    window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}`;
  };

  const handleAbout = () => {
    router.push("/help");
  };

  const handleSubscribe = () => {
    Subscribe(email)
      .then(() => {
        toast({
          title: "Subscription successful",
          description: "Hooray! email has been added to list successfully!",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to subscribe ",
          description: "Failed to subscribe to mailing list, please try again.",
          variant: "destructive",
        });
        console.error("Mailing list subscription error:", error);
      })
      .finally(() => {
        setEmail("");
      });
  };

  useEffect(() => {
    let prevScrollPos = window.scrollY;
    const navbar = document.getElementById("navbar");

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos + 3) {
        // Scrolling down
        navbar.classList.add(
          "fixed",
          "-top-10",
          "left-0",
          "right-0",
          "bg-white",
          "z-50"
        );
      } else {
        // Scrolling up
        if (currentScrollPos === 0) {
          // Reached the top of the page
          navbar.classList.remove(
            "fixed",
            "top-0",
            "w-full",
            "left-0",
            "right-0",
            "bg-white",
            "z-50"
          );
        }
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* section one  */}
      <section className="flex flex-col lg:justify-stretch space-y-12  bg-[#E6F2FF] h-screen lg:h-screen ">
        {/* Beta highlight */}
        <div className="py-2 text-center bg-[#007AFF] ">
          <p className="text-sm text-white font-normal">
            Thanks for trying the beta version of Qikelink. Please let us know
            what we should work on to make it better! Submit your{" "}
            <a className="underline" href="/feedBack">
              feedback here
            </a>
          </p>
        </div>

        {/* Header  */}
        <div
          id="navbar"
          className="bg-[#FFFFFFCC] rounded-full py-2 px-4 lg:px-8 flex justify-between items-center w-[90%] lg:w-5/6 mx-auto">
          <div className="flex space-x-3 items-center">
            <div className="flex items-center cursor-pointer">
              <img
                src="https://bafybeiaocft3rynitw5llws2tfldor4tugj525lhgc5wfshpfipvtzn2iy.ipfs.dweb.link/"
                alt="GIF"
                className="h-10 w-auto mb-5"
              />
              <p className="font-bold text-xl">Qikelink</p>
            </div>

            <Badge
              className="px-4 rounded-full bg-[#d6e7fa]"
              variant="secondary">
              Beta
            </Badge>
          </div>

          <div className="hidden lg:flex space-x-3 items-center">
            <Button variant="ghost" onClick={handleAbout}>
              About
            </Button>
            <Button variant="ghost" onClick={handleContact}>
              Contact us
            </Button>
            <Button size="lg" onClick={handleClaim} className="bg-[#007AFF]">
              Get started
            </Button>
          </div>
          <div className="lg:hidden">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>
                  <HiBars3BottomRight size={20} />
                </MenubarTrigger>
                <MenubarContent className="flex flex-col space-y-3 bg-[#FFFFFFCC] p-2">
                  <Button onClick={handleAbout} variant="ghost">
                    About
                  </Button>
                  <Button onClick={handleContact} variant="ghost">
                    Contact us
                  </Button>
                  <Button
                    className="bg-[#007AFF]"
                    onClick={handleClaim}
                    size="lg">
                    Get started
                  </Button>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>

        {/* Hero section */}
        <div className="flex justify-end relative">
          {/* Hero cloud 1 */}
          <div className="w-1/5 mt-20 ">
            <CloudIcon />
          </div>

          {/* Hero Texts */}
          <div className="grid lg:grid-cols-2 w-5/6 px-2 absolute mx-auto top-0 right-0 left-0 z-10  ">
            {/* Header text */}
            <div className="mt-8">
              <div className="text-3xl text-center lg:text-left lg:text-6xl space-y-3 font-bold ">
                <h2 className="text-[#000e44] ">
                  Increase Your Internet Income
                </h2>
                {/* <h2 className="text-[#1C1C1C]">with Qikelink </h2> */}
              </div>
              {/* Subheading text */}
              <p className="text-[#000000] lg:text-left text-center mt-6 text-base lg:text-lg w-fit font-normal">
                {" "}
                Supercharge your online earnings? you can increase your internet
                income by a whopping 50%! Our innovative link-in-bio platform
                allows you to connect with your audience through direct video
                calls.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap lg:justify-start justify-center space-y-3 sm:space-y-0 items-center sm:space-x-4 mt-8 lg:mt-12">
                <Button
                  onClick={handleClaim}
                  size="xl"
                  className="bg-[#007AFF] ">
                  <Button
                    variant="ghost"
                    className="bg-[#FFFFFF] rounded-md  px-4 mr-2">
                    <FcGoogle size={20} />
                  </Button>{" "}
                  Claim your ID
                </Button>
                <Button
                  onClick={handleBrowse}
                  size="xl"
                  className="bg-[#1C1C1C] px-10">
                  Find Leaders
                </Button>
              </div>
            </div>

            {/* Image section */}
            <div className="mt-12 flex justify-center items-center">
              <Image
                src={
                  "https://img.freepik.com/free-photo/dark-skinned-woman-talking-about-project-with-coworkers-late-night-course-video-conference-smartphone-busy-employee-using-modern-technology-network-wireless-doing-overtime-job_482257-9215.jpg?t=st=1719355210~exp=1719358810~hmac=33848292b34bf55eb59bac0810eaae5e55fd3bccc684abd7a437f3d68f66183c&w=1480"
                }
                width={550}
                height={550}
                className="rounded-md"
                alt="Picture of the author"
              />
            </div>
          </div>

          {/* Hero cloud 2 */}
          <div className="w-1/5 -mt-14 hidden lg:block ">
            <CloudIcon />
          </div>
        </div>
      </section>

      {/* section two  */}
      <section className=" flex space-x-4 justify-evenly items-center  bg-[#FFF2E6] h-[540px] lg:h-[716px]">
        {/* Hero section */}

        {/* Hero cloud 1 */}
        <div className="w-1/5">
          <img src="/section2.svg" alt="Section 2 image 1" />
        </div>

        {/* Hero Texts */}
        <div className="flex flex-col space-y-6 items-center w-2/3">
          {/* Header text */}
          <p className="text-[#6B3600] text-center text-lg font-medium">
            Connect, Earn, Grow
          </p>

          <div className="text-3xl lg:text-5xl space-y-3 text-center font-semibold">
            <p className="text-[#6B3600]">
              Connect With Your Audience Personally
            </p>
          </div>
          {/* Subheading text */}
          <p className="text-[#1C1C1C] text-base lg:text-xl w-full text-center font-normal">
            {" "}
            {/* Adjust width here */}
            With Qikelink, you can seamlessly integrate video calls into your
            bio link, allowing your followers to connect with you like never
            before. Turn casual followers into loyal fans by offering them a
            unique, personal experience.
          </p>
        </div>

        {/* Hero cloud 2 */}
        <div className="w-1/5 ">
          <img src="/section2b.svg" alt="Section 2 image 2" />
        </div>
      </section>

      {/* section three  */}
      <section className=" flex flex-col  items-center justify-center  bg-[#E6F2FF] h-[716px]">
        {/* Hero section */}

        {/* Top images */}
        <div className="hidden lg:flex justify-between items-center w-5/6 ">
          <img src="/section3a.svg" alt="Section 3 image 1" />
          <img src="/section3b.svg" alt="Section 3 image 2" />
        </div>

        {/* Hero Texts */}
        <div className="flex flex-col space-y-5 items-center  w-2/3">
          {/* Header text */}
          <p className="text-[#007AFF] text-lg font-medium">
            Effortless Connections
          </p>

          <div className="text-3xl lg:text-5xl space-y-3 text-center font-semibold">
            <p className="text-[#007AFF]">Earn While Doing What You Love</p>
          </div>
          {/* Subheading text */}
          <p className="text-[#1C1C1C] text-base lg:text-xl w-full text-center font-normal">
            {" "}
            Monetize your time and expertise by earning for direct video calls.
            Whether you're an influencer, educator, or professional, Qikelink
            provides the tools to boost your income effortlessly. Watch your
            earnings soar as you build meaningful connections.
          </p>
        </div>

        <div className=" lg:hidden justify-center items-center w-5/6 ">
          <img src="/section3a.svg" alt="Section 3 image 1" />
        </div>

        {/* Bottom images */}
        <div className="hidden lg:flex justify-between items-center w-5/6">
          <img src="/section3c.svg" alt="Section 3 image 3" />
          <img src="/section3d.svg" alt="Section 3 image 4" />
        </div>
      </section>

      {/* section four  */}
      <section className=" flex flex-col  items-center justify-center  bg-[#00BA3E08] h-[716px]">
        {/* Hero section */}

        {/* Top images */}
        <div className="hidden lg:flex justify-start items-center w-5/6 ">
          <img src="/section4a.svg" alt="Section 4 image 1" />
        </div>

        {/* Hero Texts */}
        <div className="flex flex-col space-y-5 items-center w-2/3">
          {/* Header text */}
          <p className="text-[#004015] text-lg font-medium">
            customise your QikeLink ID
          </p>

          <div className="text-3xl lg:text-5xl space-y-3 text-center font-semibold">
            <p className="text-[#004015]">Grow Your Brand</p>
          </div>
          {/* Subheading text */}
          <p className="text-[#1C1C1C] text-base lg:text-xl w-full text-center font-normal ">
            {" "}
            Stand out in the crowded digital space by offering personalized
            interactions. Qikelink helps you grow your brand by making it easier
            to engage with your audience, fostering trust, and enhancing your
            online presence.
          </p>
        </div>

        {/* Bottom images */}
        <div className="flex justify-end items-center w-5/6 mt-6 lg:mt-0">
          <img src="/section4b.svg" alt="Section 4 image 2" />
        </div>
      </section>

      {/* section five  */}
      <section className="flex flex-col items-center justify-center  bg-[#F24E1E0D] h-[716px]">
        {/* Hero section */}
        <div className="flex space-x-4 justify-evenly">
          {/* Hero cloud 1 */}
          <div className="w-1/5 hidden lg:block">
            <CloudIcon />
          </div>

          {/* Hero Texts */}
          <div className="flex flex-col space-y-4 items-center w-2/3">
            {/* Header text */}
            <p className="text-[#600000] text-lg font-medium">
              Ready to Transform Your Online Earnings?
            </p>

            <div className="text-3xl lg:text-6xl space-y-3 text-center font-semibold">
              <p className="text-[#600000]">Become Part of </p>
              <div className="text-[#600000] flex flex-col space-x-2">
                <img
                  className="mt-6"
                  src="/section5a.svg"
                  alt="Section 5 image 1"
                />
              </div>
            </div>
            {/* Subheading text */}
            <p className="text-[#1C1C1C] text-base lg:text-xl w-full text-center font-normal ">
              {" "}
              Join the Qikelink community today and start connecting with your
              audience on a deeper level. Elevate your brand, boost your
              earnings, and make every interaction count.
            </p>

            {/* CTA buttons */}
            <div className="mt-20">
              <Button onClick={handleClaim} size="lg" className="bg-[#007AFF]">
                Claim your Qikelink ID
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
      {/*  */}

      {/* section seven  */}
      <section className="flex flex-col items-center justify-center  bg-[#007AFF] h-[560px] lg:h-[716px]">
        {/* Hero section */}

        {/* Hero Texts */}
        <div className="flex flex-col space-y-5 items-center w-2/3">
          {/* Header text */}
          <p className="text-[#E6F1FE] text-lg font-normal">Newsletter</p>

          <div className="text-3xl lg:text-6xl space-y-3 text-center font-semibold">
            <p className="text-[#E6F2FF]">Get latest updates </p>
            <p className="text-[#E6F2FF]"> Join community </p>
          </div>
          {/* Subheading text */}
          <p className="text-[#E6F1FE] text-base lg:text-xl w-full text-center font-normal ">
            {" "}
            Subscribe to our newsletter to get weekly updates.
          </p>

          {/* CTA buttons */}
          <div className="mt-20 w-[80%] lg:w-[40%] space-y-3">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-white py-5 rounded-lg"></Input>
            <Button
              size="lg"
              className="bg-[#1C1C1C] px-10 w-full"
              onClick={handleSubscribe}>
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* section eight  */}
      <section className=" flex justify-center  space-x-4 items-center   bg-emerald-50 min-h-[990px] lg:h-[716px]">
        {/* Hero section */}

        <div className=" w-5/6 flex space-y-4 flex-wrap justify-center lg:justify-between items-center">
          {/* Hero Texts */}
          <div className="flex flex-col space-y-6 items-center lg:w-1/2 relative">
            <img src="/section2b.svg" alt="Section 2 image 2" />
            <div className="text-3xl absolute mx-auto left-0 right-0 lg:text-5xl font-semibold">
              {/* Header text */}
              <p className="text-[#007AFF] lg:text-lg font-medium text-left">
                FAQs
              </p>

              <p className="text-[#007AFF] lg:w-1/2">
                We have answered a few questions you may have for us
              </p>

              {/* Subheading text */}
              <p className="text-[#007AFF] text-xl w-full font-normal text-left">
                {" "}
                support@qikelink.com
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
                    Personalized Connections 🔗 QikeLink connects leaders with
                    their audience for one-on-one sessions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-2"
                  className="bg-white p-2 my-3 border-0 rounded-md">
                  <AccordionTrigger>
                    How To Get My Booking Link?
                  </AccordionTrigger>
                  <AccordionContent>
                    Your booking link is generated upon signing up with
                    Qikelink. You can easily share it with your audience right
                    away. Additionally, you can access your booking link from
                    your profile settings for quick reference.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-3"
                  className="bg-white p-2 my-3 border-0 rounded-md">
                  <AccordionTrigger>
                    How Can I Make Money with Qikelink?
                  </AccordionTrigger>
                  <AccordionContent>
                    Earn from Your Expertise 💵 Offer one-on-one sessions to
                    your audience and monetize your skills.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-4"
                  className="bg-white p-2 my-3 border-0 rounded-md">
                  <AccordionTrigger>Privacy Policy?</AccordionTrigger>
                  <AccordionContent>
                    We respect your privacy and ensure your data is secure.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem
                  value="item-5"
                  className="bg-white p-2 my-3 border-0 rounded-md">
                  <AccordionTrigger>Do I Need Money To SignUp</AccordionTrigger>
                  <AccordionContent>
                    No, signing up for Qikelink is absolutely free.
                    {/* You only pay when you
                    book sessions with mentors. */}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* section nine  */}
      <section className=" flex flex-col space-y-4 py-8 items-center bg-[#E6F2FF] h-[245px]">
        {/* Footer section */}

        <div className="flex justify-between w-5/6">
          <div className="flex items-center">
            <p className="font-bold text-base lg:text-xl ">Qikelink.com</p>
          </div>

          <div className="flex flex-col space-y-2" variant="secondary">
            <p className="hidden lg:block lg:text-lg">Stay in touch</p>
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
