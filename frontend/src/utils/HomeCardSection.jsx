import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import {Tabs, Tab} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

const HomeCardSection = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
    <>
    <div className="flex flex-col">
    <div className="flex flex-wrap gap-4 p-4">
        <Tabs variant="bordered" aria-label="Tabs variants">
          <Tab key="tech" title="Tech"/>
          <Tab key="youtuber" title="Youtuber"/>
          <Tab key="startup" title="StartUps"/>
          <Tab key="personalDevelopment" title="PersonalDevelopment"/>
          <Tab key="education" title="Education"/>
          <Tab key="psychology" title="Psychology"/>
        </Tabs>
    </div>
    <div className="flex flex-row gap-4 mt-6 flex-wrap px-4">
        
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
              onPress={onOpen}
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
            
          </CardFooter>
        </Card>
      ))}
    </div>
    </div>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
    
    
  );
};

export default HomeCardSection;
