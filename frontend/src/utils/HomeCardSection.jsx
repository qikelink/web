import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Image,
} from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

const HomeCardSection = () => {
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
    {
      title: "Raspberry",
      img: "/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Lemon",
      img: "/images/fruit-4.jpeg",
      price: "$5.30",
    },
    {
      title: "Avocado",
      img: "/images/fruit-5.jpeg",
      price: "$15.70",
    },
    {
      title: "Lemon 2",
      img: "/images/fruit-6.jpeg",
      price: "$8.00",
    },
    {
      title: "Banana",
      img: "/images/fruit-7.jpeg",
      price: "$7.50",
    },
    {
      title: "Watermelon",
      img: "/images/fruit-8.jpeg",
      price: "$12.20",
    },
  ];

  return (
    <div className="flex flex-row gap-4 flex-wrap p-4">
      {list.map((item, index) => (
        <Card key={index} className="py-4 ">
          <CardHeader className="justify-between">
            <div className="flex gap-2">
              <Avatar
                isBordered
                radius="full"
                size="md"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">
                  Zoey Lang
                </h4>
                <h5 className="text-small tracking-tight text-default-400">
                  @zoeylang
                </h5>
              </div>
            </div>
            <Button
              className={
                isFollowed
                  ? "bg-transparent text-foreground border-default-200 p-1"
                  : ""
              }
              color="primary"
              radius="md"
              size="sm"
              variant={isFollowed ? "bordered" : "solid"}
              onPress={() => setIsFollowed(!isFollowed)}
            >
              {isFollowed ? "UnRequest" : "Request"}
            </Button>
          </CardHeader>
          <CardBody className=" px-3 py-2 text-small text-default-400">
            <div className=" text-wrap">
Frontend developer and UI/UX enthusiast.<br/> Join me on this coding adventure!
            </div>
            <span className="pt-2">
              #FrontendWithZoey
              <span className="py-2" aria-label="computer" role="img">
                💻
              </span>
            </span>
          </CardBody>
          <CardFooter className="justify-between">
            <div className="flex gap-3">
              <div className="flex gap-1">
              <p className="font-semibold text-yellow-500 text-small flex">
                <FaStar color="yellow" />
                <FaStar color="yellow" />
                <FaStar color="yellow"/>
                <FaStar color="yellow" />
                <FaStarHalf />

              </p>
              <p className=" text-default-400 text-small">Rating</p>
            </div>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">$40</p>
              <p className="text-default-400 text-small">Per Min</p>
            </div>
            {/* <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">4</p>
              <p className=" text-default-400 text-small">Following</p>
            </div>
            <div className="flex gap-1">
              <p className="font-semibold text-default-400 text-small">97.1K</p>
              <p className="text-default-400 text-small">Followers</p>
            </div> */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HomeCardSection;
