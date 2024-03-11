import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Image,
  User,
} from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

const HeaderCardSection = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  const list = [
    {
      title: "Orange",
      img: "/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "Tangerine",
      img: "/images/fruit-2.jpeg",
      price: "$3.00",
    },
  ];

  return (
    <div style={{ position: "relative", width: "500px" }}>
      <Image
        width={500}
        alt="NextUI hero Image"
        src="/diver.png"
        style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}
      />
      <div
        style={{
          position: "relative",
          top: 0,
          left: 0,
          padding: "20px",
          color: "white",
          zIndex: 1,
        }}
      >
        <p className="text-lg font-poppins font-semibold">
          How to do Basic Jumping and how to landing safely
        </p>
        <User
          name="Thomas Hope"
          description="Hello hello.. more details"
          avatarProps={{
            src: "https://i.pravatar.cc/150?u=a04258114e29026702d",
            size: "md",
          }}
        />
      </div>
    </div>
  );
};

export default HeaderCardSection;
