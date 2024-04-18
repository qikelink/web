import React, { useState, useEffect } from "react";
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
import { Skeleton } from "./ui/skeleton";
import {
  createOrganization,
  getAllOrganizations,
  getImageUrl,
  removeOrganization,
  sendQuestion,
  getOrgSessions,
  updateOrganization,
} from "../../../backend/src/pocketbase";
import { useToast } from "./ui/use-toast";
import { Label } from "./ui/label";
import { EmptyIcon } from "@/icons/EmptyIcon";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "./ui/textarea";
import Select from "react-select";
import { dataset } from "@/dummy_api/dataSet";
import Link from "next/link";
import { GrTag } from "react-icons/gr";

const data = [1, 2, 3];

const OrganizationSection = () => {
  const { user, allOrganization, setAllOrganization, isLoadingUserData } =
    useUser();
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);
  const [profileImage, setProfileImage] = useState("");
  const [question, setQuestion] = useState("");
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState("");
  const [formData, setFormData] = useState({});
  const [session, setSession] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSessions, setShowSessions] = useState(false);

  const toggleSessions = () => {
    setShowSessions(!showSessions);
  };

  const options = dataset.map((item) => ({ value: item, label: item }));

  // useEffect(() => {
  //   if (user != undefined) {
  //     getAllOrganizations(user.id, user.email)
  //       .then((res) => {
  //         setAllOrganization(res);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching bookmarks data:", error);
  //       });
  //   }
  // }, [allOrganization]);

  useEffect(() => {
    if (allOrganization.length > 0) {
      const fetchSessions = async () => {
        const sessionData = [];
        for (const organization of allOrganization) {
          const orgSession = await getOrgSessions(organization.id);
          sessionData.push(orgSession);
        }
        setSession(sessionData);
      };

      fetchSessions();
    }
  }, [isModalOpen, user, allOrganization]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleAddMember = () => {
    if (newMember.trim() !== "") {
      setMembers([...members, newMember]);
      setNewMember("");
    }
  };

  const handleRemove = (id) => {
    removeOrganization(id)
      .then(() => {
        toast({
          title: "Organization deleted",
          description: "Organization deleted successfully!",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to delete organization",
          description: "An error occurred while deleting organization.",
          variant: "destructive",
        });
        console.error("Organization delete error:", error);
      })
      .finally(() => {
        getAllOrganizations(user.id, user.email)
          .then((res) => {
            setAllOrganization(res);
          })
          .catch((error) => {
            console.error("Error fetching session data:", error);
          });
      });
  };

  const handleClick = () => {
    setIsSpinning(true);

    const interests = selectedOption
      ? selectedOption.map((option) => option.label).join(", ")
      : "";

    const membersString = members.join(", ");

    createOrganization(profileImage, name, tagline, membersString, interests)
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
        getAllOrganizations(user.id, user.email)
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
        setSelectedOption(null);
        setIsSpinning(false);
      });
  };

  const handleUpdate = (item) => {
    setIsSpinning(true);

    const existingMembers = item.members;
    const allMembers = [...existingMembers.split(","), ...members];
    const membersString = allMembers.join(", ");

    setProfileImage(profileImage !== "" ? profileImage : item.avatar || "");

    updateOrganization(
      item.id,
      profileImage,
      formData.name,
      formData.tagline,
      undefined,
      membersString
    )
      .then(() => {
        toast({
          title: "Organization updated",
          description: "Organization updated successfully!",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to update organization",
          description: "Sorry, an error occurred! Please try again.",
          variant: "destructive",
        });
        console.error("Organization update error:", error);
      })
      .finally(() => {
        getAllOrganizations(user.id, user.email)
          .then((res) => {
            setAllOrganization(res);
          })
          .catch((error) => {
            console.error("Error fetching session data:", error);
          });
        setMembers("");
        setIsSpinning(false);
      });
  };

  const handleQuestions = (item) => {
    setIsSpinning(true);

    sendQuestion(question, item.id)
      .then(() => {
        toast({
          title: "Question sent",
          description: "Question sent successfully!",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to send question",
          description: "Sorry, an error occurred! Please try again.",
          variant: "destructive",
        });
        console.error("Question sending error:", error);
      })
      .finally(() => {
        setQuestion("");
      });
  };

  const handleLeave = (item) => {
    setIsSpinning(true);

    const membersString = members.join(", ");

    updateOrganization(
      item.id,
      profileImage,
      name,
      tagline,
      undefined,
      membersString
    )
      .then(() => {
        toast({
          title: "Organization updated",
          description: "Organization updated successfully!",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to update organization",
          description: "Sorry, an error occurred! Please try again.",
          variant: "destructive",
        });
        console.error("Organization update error:", error);
      })
      .finally(() => {
        getAllOrganizations(user.id, user.email)
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

  const organizationDialog = (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xl" className="bg-blue text-sm lg:text-base mt-3">
          Create Organization
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-md">
        <div className="max-h-[500px] w-full overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Organization</DialogTitle>
            <DialogDescription>
              You can Create an Organization in sec, include a profile image to
              increase chances of request Success.
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
              <Label className="text-lg ">Interests</Label>
              <Select
                className="bg-inputbackground active:bg-inputbackground rounded-md "
                isMulti={true}
                autoFocus={true}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
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
            <div className="grid grid-cols-4 gap-2 h-auto overflow-y-auto border p-1">
              {members &&
                members.map((email, index) => (
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
            <Button size="xl" onClick={() => handleClick()}>
              {isSpinning ? "Creating" : "Create"}
              <AiOutlineLoading3Quarters
                className={`${isSpinning ? "ml-3 animate-spin" : "hidden"}`}
              />
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );

  // const editDialog = (item) => {
  //   const defaultFormData = {
  //     name: "",
  //     tagline: "",
  //   };

  //   const initialFormData = item
  //     ? {
  //         name: item.usernane,
  //         tagline: item.org_about,
  //       }
  //     : defaultFormData;

  //   setFormData(initialFormData);

  //   return (
  //     <Dialog>
  //       <DialogTrigger asChild>
  //         <Button size="xl" className="bg-blue text-sm lg:text-base mt-3">
  //           Edit Community
  //         </Button>
  //       </DialogTrigger>
  //       <DialogContent className="sm:max-w-[425px] rounded-md">
  //         <div className="max-h-[500px] w-full overflow-y-auto">
  //           <DialogHeader>
  //             <DialogTitle>Edit Organization</DialogTitle>
  //             <DialogDescription>
  //               You can Create an Organization in sec, include a profile image
  //               to increase chances of request Success.
  //             </DialogDescription>
  //           </DialogHeader>
  //           <div className="grid gap-4 py-3">
  //             <div className="flex flex-col space-y-1">
  //               <Label className="text-lg">Organization logo</Label>
  //               <input
  //                 id="image"
  //                 type="file"
  //                 placeholder="Image"
  //                 className="col-span-4 border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:border-blue-500"
  //                 onChange={(e) => setProfileImage(e.target.files[0])}
  //               />
  //             </div>
  //             <div className="flex flex-col space-y-1">
  //               <Label className="text-lg">Organization name</Label>
  //               <input
  //                 id="editName"
  //                 value={formData.name}
  //                 className="col-span-4 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
  //                 onChange={(e) => setEditName(e.target.value)}
  //               />
  //             </div>
  //             <div className="flex flex-col space-y-1">
  //               <Label className="text-lg">About organization</Label>
  //               <input
  //                 id="editTagLine"
  //                 value={formData.tagline}
  //                 className="col-span-4 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
  //                 onChange={(e) => setEditTagline(e.target.value)}
  //               />
  //             </div>
  //             <div className="flex flex-col space-y-1">
  //               <Label className="text-lg">Add members</Label>
  //               <div className="flex justify-between w-full items-center space-x-3">
  //                 <input
  //                   id="members"
  //                   value={newMember}
  //                   type="email"
  //                   placeholder="Enter Members email"
  //                   className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
  //                   onChange={(e) => setNewMember(e.target.value)}
  //                 />

  //                 <Button
  //                   className="col-span-1 bg-primary text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
  //                   onClick={handleAddMember}
  //                 >
  //                   Add
  //                 </Button>
  //               </div>
  //             </div>
  //             <div className="grid grid-cols-4 gap-2 h-auto overflow-y-auto border p-1">
  //               {members &&
  //                 members.map((email, index) => (
  //                   <div
  //                     key={index}
  //                     className="col-span-4 border border-gray-300 rounded-md py-2 px-4"
  //                   >
  //                     {email}
  //                   </div>
  //                 ))}
  //             </div>
  //           </div>
  //           <DialogFooter>
  //             <Button size="xl" onClick={() => handleUpdate(item)}>
  //               {isSpinning ? "Saving" : "Save"}
  //               <AiOutlineLoading3Quarters
  //                 className={`${isSpinning ? "ml-3 animate-spin" : "hidden"}`}
  //               />
  //             </Button>
  //           </DialogFooter>
  //         </div>
  //       </DialogContent>
  //     </Dialog>
  //   );
  // };

  function trimToTenCharacters(str) {
    if (str.length <= 9) {
      return str;
    } else {
      return str.substring(0, 9) + "..";
    }
  }

  return (
    <div className="">
      {allOrganization.length > 0 && (
        <div className="flex justify-between items-center mt-3">
          <h2 className="text-lg lg:text-xl">Organizations</h2>
          <div className="hidden lg:block">{organizationDialog}</div>
        </div>
      )}

      <>
        {isLoadingUserData ? (
          <div className="grid grid-cols-1 gap-3 w-full mt-2">
            {/* Skeleton loaders */}
            {data.map((item, index) => (
              <Skeleton key={index} className="h-24 w-full rounded-md" />
            ))}
          </div>
        ) : (
          <>
            {allOrganization.length > 0 ? (
              allOrganization.map((item, index) => (
                <Alert
                  key={index}
                  className="my-2 flex gap-3 items-center justify-between"
                >
                  <Avatar>
                    <AvatarImage
                      src={getImageUrl(item.collectionId, item.id, item.avatar)}
                      alt="profile image"
                    />
                    <AvatarFallback>
                      {item.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <AlertTitle>{item.username}</AlertTitle>
                    <AlertDescription className="hidden lg:block">
                      {item.org_about}
                    </AlertDescription>
                  </div>
                  <div className="flex-end flex gap-2">
                    {user.id === item.owner ? (
                      <Badge
                        variant="outline"
                        className={"cursor-pointer "}
                        onClick={() => handleRemove(item.id)}
                      >
                        <RiDeleteBin5Line size={15} color="red" />
                      </Badge>
                    ) : null}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={handleModalOpen} variant="outline">
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] rounded-md">
                        <div className="rounded-md p-3">
                          <h2 className="text-xl font-bold mb-2">
                            {item.username}
                          </h2>
                          <div className="mt-2">
                            <p className="text-gray-600">Interests</p>
                            <div className="flex gap-2 flex-wrap item-center">
                              <Badge variant="outline">
                                <GrTag color="green" />
                              </Badge>{" "}
                              {item && item.interests
                                ? item.interests
                                    .split(",")
                                    .map((interest, index) => (
                                      <Badge key={index} variant="outline">
                                        {trimToTenCharacters(interest.trim())}
                                      </Badge>
                                    ))
                                : "N/A"}
                            </div>
                          </div>
                          <div className="mt-2">
                            <p className="text-gray-600">About Organization</p>
                            <p className="line-clamp-3">{item.org_about}</p>
                          </div>

                          <div>
                            {/* Button to toggle display of upcoming sessions */}
                            <p className="mt-2" onClick={toggleSessions}>
                              {showSessions
                                ? "Show Upcoming Sessions"
                                : " Upcoming Sessions"}
                            </p>

                            {/* Fetch the matching session */}
                            {session && session.length > 0 && showSessions && (
                              <>
                                <h2 className="text-xl font-bold mt-4 mb-2">
                                  Upcoming session
                                </h2>
                                {/* Map through sessions and display details */}
                                {session.map((org) => {
                                  if (org.organization === item.id) {
                                    return (
                                      <div>
                                        <div
                                          key={org.id}
                                          className="grid grid-cols-2 gap-2"
                                        >
                                          <div>
                                            <p className="text-gray-600">
                                              Mentor
                                            </p>
                                            <p className="font-semibold">
                                              {org.expand.mentor.username}
                                            </p>
                                          </div>
                                          <div>
                                            <p className="text-gray-600">
                                              Mentor session link
                                            </p>
                                            <Link
                                              className="underline cursor-pointer"
                                              href="/"
                                            >
                                              {org.expand.mentor.username}
                                            </Link>
                                          </div>
                                        </div>
                                        <div className="mt-2">
                                          <p className="text-gray-600">
                                            About Mentor
                                          </p>
                                          <p className="line-clamp-3">
                                            {org.expand.mentor.bio}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                              </>
                            )}

                            {/* If there are no upcoming sessions */}
                            {session &&
                              session.length === 0 &&
                              showSessions && (
                                <div className="flex flex-col  items-center w-full h-full my-16">
                                  <EmptyIcon size={120} />
                                  <p className="text-center text-lg font-medium text-darktext">
                                    No upcoming session.
                                  </p>
                                </div>
                              )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </Alert>
              ))
            ) : (
              <div className="flex flex-col items-center w-full h-full mt-32">
                <EmptyIcon size={150} />
                <p className="text-center text-xl font-medium text-darktext">
                  No organization created yet.
                </p>
                {organizationDialog}
              </div>
            )}

            {/* Dialog for creating an organization */}
            {allOrganization.length > 0 && (
              <div className=" lg:hidden">{organizationDialog}</div>
            )}
          </>
        )}
      </>

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
