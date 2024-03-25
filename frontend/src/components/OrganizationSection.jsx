import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUser } from "@/contexts/user-context";
import { BookmarkEmpty } from "./emptystate/bookmarkEmpty";
import { Skeleton } from "./ui/skeleton";
import {
  createOrganization,
  getAllOrganizations,
  getImageUrl,
} from "../../../backend/src/pocketbase";
import { useToast } from "./ui/use-toast";
import { Label } from "./ui/label";

const data = [1, 2, 3];

const OrganizationSection = () => {
  const { user, allOrganization, setAllOrganization, isLoadingUserData } =
    useUser();
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");

  const handleAddMember = () => {
    if (newMember.trim() !== "") {
      setMembers([...members, newMember]);
      setNewMember("");
    }
  };

  const handleClick = () => {
    setIsSpinning(true);

    const membersString = members.join(", ");

    createOrganization(profileImage, name, tagline, undefined, membersString)
      .then(() => {
        toast({
          title: "Organization created",
          description: "Organization created successfully!",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to create organization",
          description: "Sorry, an error occurred! Please try again.",
          variant: "destructive",
        });
        console.error("Organization creation error:", error);
      })
      .finally(() => {
        getAllOrganizations(user[0].id, user[0].email)
          .then((res) => {
            setAllOrganization(res);
          })
          .catch((error) => {
            console.error("Error fetching session data:", error);
          });
        setName("");
        setTagline("");
        setMembers("");
        setProfileImage("");
        setIsSpinning(false);
      });
  };

  return (
    <div className="py-2">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Organizations</h2>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue">Create Organization</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Organization</DialogTitle>
              <DialogDescription>
                You can Create an Organization in sec, include a profile image
                to increase chances of request Success.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-3">
              <div className="flex flex-col space-y-1">
                <Label className="text-lg">Organization logo</Label>
                <input
                  id="image"
                  type="file"
                  placeholder="Image"
                  className="col-span-4 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <Label className="text-lg">Organization name</Label>
                <input
                  id="name"
                  value={name}
                  className="col-span-4 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <Label className="text-lg">About organization</Label>
                <input
                  id="tagLine"
                  value={tagline}
                  className="col-span-4 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                  onChange={(e) => setTagline(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <Label className="text-lg">Add members</Label>
                <div className="flex justify-between w-full items-center space-x-3">
                  <input
                    id="members"
                    value={newMember}
                    type="email"
                    placeholder="Enter Members email"
                    className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
                    onChange={(e) => setNewMember(e.target.value)}
                  />

                  <Button
                    className="col-span-1 bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    onClick={handleAddMember}
                  >
                    Add
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 h-32 overflow-y-auto border p-1">
                {members.map((email, index) => (
                  <div
                    key={index}
                    className="col-span-4 border border-gray-300 rounded-md py-2 px-4"
                  >
                    {email}
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => handleClick()}>
                {isSpinning ? "Creating" : "Create"}
                <AiOutlineLoading3Quarters
                  className={`${isSpinning ? "ml-3 animate-spin" : "hidden"}`}
                />
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoadingUserData ? (
        <div className="grid grid-cols-1 gap-3 w-full mt-2">
          {/* Skeleton loaders */}
          {data.map((item, index) => (
            <Skeleton key={index} className="h-24 w-full rounded-md" />
          ))}
        </div>
      ) : allOrganization.length > 0 ? (
        allOrganization.map((item, index) => (
          <Alert
            key={index}
            className="my-2 flex gap-3 item-center justify-between"
          >
            <Avatar>
              <AvatarImage
                src={getImageUrl(item.collectionId, item.id, item.avatar)}
                alt="profile image"
              />
              <AvatarFallback>
                {" "}
                {item.org_name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <AlertTitle>{item.org_name}</AlertTitle>
              <AlertDescription>{item.org_about}</AlertDescription>
            </div>
            <div className="flex-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Details</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Organization Details</DialogTitle>
                  </DialogHeader>
                  <div className="bg-white shadow-md rounded-md p-6">
                    <h2 className="text-xl font-bold mb-4">{item.org_name}</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600">Members Number</p>
                        <p className="font-semibold">
                          {
                            item.members
                              .split(",")
                              .filter((email) => email.trim() !== "").length
                          }
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Meetings Held</p>
                        <p className="font-semibold">{item.sessions.length}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray-600">About Organiation</p>
                      <p className="">{item.org_about}</p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Alert>
        ))
      ) : (
        <div className="flex justify-center items-center h-full">
          {/* Render Empty when no organization exist */}
          <BookmarkEmpty />
        </div>
      )}

      <div className="flex flex-end hidden">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default OrganizationSection;
