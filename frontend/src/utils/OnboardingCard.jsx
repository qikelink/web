"use client";

import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  getExistingUsers,
  getGoogle,
  login,
  Signup,
  toggleGoogle,
  getImageUrl,
  getUser,
  isUserValid,
  updateSetting,
  verifyRequest,
  updateVerifyRequest,
  getMentor,
} from "../../../backend/src/pocketbase";
import { BsCopy, BsFillSendArrowDownFill } from "react-icons/bs";
import { useToast } from "@/components/ui/use-toast";
import Select from "react-select";
import { dataset, datasetOnboarding } from "@/dummy_api/dataSet";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Separator } from "@/components/ui/separator";
import { ImCross } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import googleLogo from "../../public/google.png";
import { useUser } from "@/contexts/user-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const options = datasetOnboarding.map((item) => ({ value: item, label: item }));

const OnboardingCard = () => {
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState("");
  const [quickService, setQuickService] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const { toast } = useToast();
  const { user, mentor, setMentor, isLoading, setUser } = useUser();
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    const defaultFormData = {
      avatar: "",
      email: "",
      username: "",
      phoneNumber: "",
      bio: "",
      awards: "",
      verified: false,
    };

    setFormData(defaultFormData);
  }, []);

  setTimeout(() => {
    setShowDialog(true);
  }, 300);

  useEffect(() => {
    const savedQuickService = localStorage.getItem("quickService");
    if (savedQuickService !== null) {
      setQuickService(savedQuickService === "true");
    } else if (mentor && mentor.username && mentor.username.length > 0) {
      setQuickService(mentor.quickService || false);
    }
  }, [mentor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const id = user.id;
    const imageToUpdate = profileImage ? profileImage : formData.avatar;

    const interests = selectedOption
      ? selectedOption.map((option) => option.label).join(", ")
      : "";

    let missingFields = [];

    if (formData.bio === "") {
      missingFields.push("bio");
    }

    if (formData.username === "") {
      missingFields.push("full name");
    }

    if (profileImage === "") {
      missingFields.push("profile image");
    }

    if (missingFields.length > 0) {
      missingFields.forEach((field) => {
        toast({
          title: "Missing required field",
          description: `Please add your ${field} to continue.`,
          variant: "destructive",
        });
      });
      return false; // Indicate that there are missing fields
    }

    setIsSpinning(true);

    updateSetting(
      id,
      imageToUpdate,
      formData.username,
      formData.phoneNumber,
      formData.bio,
      formData.awards
    )
      .then(() => {
        verifyRequest(
          formData.username,
          formData.phoneNumber,
          formData.bio,
          formData.awards,
          undefined,
          undefined,
          undefined,
          "0",
          interests,
          "1.0/5.0"
        );
        setIsSpinning(!isSpinning);
        toast({
          title: "profile created",
          description: "profile created successfully! .",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to create profile",
          description: "Sorry an error just occurred! please try again.",
          variant: "destructive",
        });
        console.error("onboarding error:", error);
      })
      .finally(() => {
        getUser()
          .then((res) => {
            setUser(res);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });

        getMentor()
          .then((res) => {
            setMentor(res);
          })
          .catch((error) => {
            console.error("Error fetching mentor data:", error);
          });

        setIsSpinning(false);

        setShowVerify(true);
      });
  };

  return (
    <div className="h-fit text-lg">
      {/* Profile image */}
      <h2 className="text-xl font-semibold mb-2">Setup your profile</h2>
      <div className="border border-gray-200 rounded-lg p-4 lg:p-10">
        <Label className="text-lg">Profile Image</Label>
        {isLoading ? (
          <Skeleton className="h-24 w-24 mt-3 md:h-32 md:w-32 rounded-full"></Skeleton>
        ) : (
          user && (
            <Avatar className="h-24 w-24 mt-3 md:h-32 md:w-32">
              <AvatarImage
                src={getImageUrl(user.collectionId, user.id, user.avatar)}
              />
              <AvatarFallback> User</AvatarFallback>
            </Avatar>
          )
        )}
        <div className="flex justify-between items-center gap-3 mt-4">
          <Input
            id="picture"
            type="file"
            className="sm:w-52 w-48 bg-inputbackground "
            onChange={(e) => setProfileImage(e.target.files[0])}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <div>
            <Label className=" text-lg">Area of expertise</Label>
            <Select
              className="bg-inputbackground active:bg-inputbackground mt-1"
              isMulti={true}
              autoFocus={true}
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
          </div>

          <div>
            <Label className="text-lg">Full name</Label>
            <Input
              className="py-6 px-3 bg-inputbackground"
              placeholder="Please enter your full name"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label className="text-lg">Email</Label>
            <Input
              className="py-6 px-3 bg-inputbackground"
              placeholder="Please enter your email"
              name="email"
              type="email"
              value={user ? user.email : ""}
              readonly
            />
          </div>

          <div>
            <Label className="text-lg">Phone number (optional)</Label>
            <Input
              className="py-6 px-3 bg-inputbackground"
              placeholder="Please enter your cell number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-6">
          <Label className="text-lg">Bio</Label>
          <Textarea
            className="h-24 sm:h-36 bg-inputbackground"
            placeholder="Write your bio here, feel free to brag about yourself!"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <Label className="text-lg">Work Experience (optional)</Label>
          <Textarea
            className="h-24 sm:h-36 bg-inputbackground"
            placeholder="Relevant work experiences separated by commas. eg CTO @startup, founder @startup, etc "
            name="awards"
            value={formData.awards}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-2 md:justify-end gap-1 lg:gap-3 justify-center lg:flex-row items-start mt-6 lg:space-x-5">
          {!isUserValid ? (
            <LoginDialog />
          ) : (
            <Button
              size="xl"
              className="bg-blue hover:bg-darkblue text-lg rounded-lg flex "
              onClick={handleSubmit}
            >
              {isSpinning ? "Creating profile" : "Create profile"}
              <AiOutlineLoading3Quarters
                className={`${isSpinning ? "ml-3 animate-spin" : "hidden"}`}
              />
            </Button>
          )}

          {showVerify ? <VerifyModal userData={user} mentor={mentor} /> : null}
        </div>
      </div>
    </div>
  );
};
export default OnboardingCard;

const LoginDialog = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [password, setPassword] = useState("");
  const [comfirmPass, setComfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isloadingGoogle, setIsLoadingGoogle] = useState(false);
  const history = useRouter();
  const { toast } = useToast();
  const { setIsUserValid } = useAuth();
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showComfirmPass, setShowComfirmPass] = useState(false);

  const closeDialog = () => setIsDialogOpen(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleComfirmPasswordVisibility = () => {
    setShowComfirmPass(!showComfirmPass);
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
  };

  const evaluatePasswordStrength = (value) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (regex.test(value)) {
      setPasswordStrength("Stong - Passsword strength is okay ✅");
    } else if (value.length >= 8) {
      setPasswordStrength(
        "Weak - Must contain at least one uppercase letter, one lowercase letter, and one number."
      );
    } else if (value.length > 0) {
      setPasswordStrength(
        "Weak - Must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, and one number."
      );
    } else {
      setPasswordStrength("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    evaluatePasswordStrength(e.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!isSignIn && password !== comfirmPass) {
      toast({
        title: "Passwords do not match",
        description: "Password and confirm password must match",
        variant: "destructive",
      });
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!isSignIn && !passwordRegex.test(password)) {
      toast({
        title: "Weak Password",
        description:
          "Weak password, please ensure password meets the requirements",
      });
      return;
    }

    if ((isSignIn && password.length < 1) || email.length < 1) {
      toast({
        title: "Input cannot be empty",
        description: "Inputs cannot be empty, please provide your credentials",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    if (isSignIn) {
      login(email, password, setIsUserValid)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          toast({
            title: "Invalid credentials",
            description:
              "Invalid login credentials! please enter correct details.",
            variant: "destructive",
          });
          console.error("Login error:", error);
        })
        .finally(() => {
          setTimeout(() => {
            setEmail("");
            setPassword("");
            setComfirmPass("");
            setIsLoading(false);
          }, 3000);
        });
    } else {
      getExistingUsers()
        .then((existingUsers) => {
          const emailExists = existingUsers.some(
            (user) => user.superEmail === email
          );
          if (emailExists) {
            toast({
              title: "Email already exists",
              description:
                "The email you provided already exists, Sign into your account instead.",
              variant: "default",
            });
            toggleMode();
            setEmail("");
            setPassword("");
            setComfirmPass("");
            setIsLoading(false);
          } else {
            Signup(email, email, password, password)
              .then(() => {
                toast({
                  title: "Account created",
                  description:
                    "Account created successfully! Signing in with new credentials.",
                  variant: "default",
                });
                login(email, password, setIsUserValid).then(() => {
                  window.location.reload();
                });
              })
              .catch((error) => {
                toast({
                  title: "Failed to create account",
                  description:
                    "An error occurred while creating the account. Please try again.",
                  variant: "destructive",
                });
                console.error("Signup error:", error);
              })
              .finally(() => {
                // Reset form fields and loading state
                setTimeout(() => {
                  setIsLoading(false);
                  setEmail("");
                  setPassword("");
                  setComfirmPass("");
                }, 2000);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  };

  const handleGoogle = async () => {
    try {
      setIsLoadingGoogle(true);

      if (!session) {
        await toggleGoogle(true);
        await signIn("google");
      } else {
        const existingUsers = await getExistingUsers();
        const emailExists = existingUsers.some(
          (user) => user.superEmail === session.user.email
        );

        const emailExistsButDiffPassword = existingUsers.some(
          (user) =>
            user.superEmail === session.user.email &&
            user.superPassword !== session.user.email
        );

        if (emailExistsButDiffPassword) {
          toast({
            title: "Email already exists",
            description:
              "Email already exists, please sign in with email and password or reset password",
            variant: "destructive",
          });
        } else if (emailExists) {
          await login(session.user.email, session.user.email, setIsUserValid);
          window.location.reload();
        } else {
          await Signup(
            session.user.email,
            session.user.email,
            session.user.email,
            session.user.email
          );
          await login(session.user.email, session.user.email, setIsUserValid);
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    } finally {
      setIsLoadingGoogle(false);
    }
  };

  useEffect(() => {
    if (session && !isUserValid) {
      getGoogle()
        .then((res) => {
          if (res.signIn === true) {
            handleGoogle();
          }
        })
        .catch((error) => {
          console.error("Google auto sign in error:", error);
        });
    }
  }, [session]);

  const buttonText = isSignIn ? "Sign In" : "Sign Up";
  const googleText = isSignIn
    ? "Continue with google "
    : "Continue with google";

  const linkText = isSignIn ? "Create an account" : "Sign In";
  const Description = isSignIn
    ? "Sign Into Your Account To Get Started."
    : "Create An Account To Get Started With Qikelink.";

  return (
    <Dialog open={isDialogOpen} onClose={closeDialog}>
      <DialogTrigger>
        <Button
          size="xl"
          className="bg-blue hover:bg-darkblue text-lg rounded-lg flex w-full"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          Create profile
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-md">
        <DialogHeader className="mt-2 mb-2">
          <DialogTitle className="flex justify-between">
            {" "}
            {isSignIn ? "Log in" : "Sign up"}{" "}
            <DialogClose onClick={closeDialog} asChild>
              <ImCross size={12} />
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="text-left">
            {Description}
          </DialogDescription>
        </DialogHeader>
        <div>
          <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
              className="p-6"
              isRequired
              placeholder="Enter your email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {isSignIn ? (
              <div className="relative">
                <Input
                  className="p-6 pr-12"
                  isRequired
                  placeholder="Enter password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="relative">
                  <Input
                    className="p-6 pr-12"
                    isRequired
                    placeholder="Enter your password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye color="gray" />}
                  </button>
                </div>

                <div className="relative">
                  <Input
                    className="p-6 pr-12"
                    isRequired
                    placeholder="Please Confirm password"
                    type={showComfirmPass ? "text" : "password"}
                    name="password"
                    value={comfirmPass}
                    onChange={(e) => setComfirmPass(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={toggleComfirmPasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    {showComfirmPass ? <FaEyeSlash /> : <FaEye color="gray" />}
                  </button>
                </div>
                <p className="text-sm text-darktext">{passwordStrength}</p>
              </div>
            )}

            <Button
              size="xl"
              className="bg-blue hover:bg-darkblue text-lg rounded-lg"
              type="submit"
            >
              {isloading ? "Signing In..." : buttonText}
            </Button>

            <p className=" text-sm">
              {isSignIn ? "Need an account?" : "Already have an account?"}{" "}
              <a
                href="#"
                className="font-semibold text-blue-500 hover:text-blue-700 ml-1 underline"
                onClick={toggleMode}
              >
                {linkText}
              </a>
            </p>

            <Separator />
          </form>
          <Button
            size="xl"
            className=" bg-indigo hover:bg-gray-600 text-lg rounded-lg w-full mt-3"
            onClick={handleGoogle}
          >
            <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
            <span className="ml-4">
              {isloadingGoogle ? "Signing in.." : googleText}
            </span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const VerifyModal = ({ blue, userData, mentor }) => {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    contact: "",
    account: "",
  });
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  const { toast } = useToast();
  const { user } = useUser();

  const router = useRouter();

  const closeDialog = () => setIsDialogOpen(false);
  const openDialog = () => setIsDialogOpen(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isAnyFieldEmpty = Object.values(formData).some(
      (value) => value === ""
    );

    if (isAnyFieldEmpty) {
      toast({
        title: "Please provide all values",
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }

    const interests = selectedOption
      ? selectedOption.map((option) => option.label).join(", ")
      : "";

    updateVerifyRequest(
      mentor.id,
      userData.name,
      userData.phoneNumber,
      userData.bio,
      userData.awards,
      formData.contact,
      formData.account,
      file,
      "0",
      interests,
      "1.0/5.0"
    )
      .then(() => {
        toast({
          title: "Verification Request Sent",
          description: "Your verification request has been sent successfully!",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to Send Verification Request",
          description: "Sorry, an error occurred. Please try again.",
          variant: "destructive",
        });
        console.error("Verification Error:", error);
      })
      .finally(() => {
        setFormData({
          contact: "",
          account: "",
        });
        setFile(null);
      });
  };

  const handleNavigate = () => {
    router.push("/manager/Upcoming");
  };

  async function copyBookingLink() {
    try {
      // Get the current BookCard URL
      const BookCardUrl = `https://qikelink.com/book/${user.id}`;

      // Copy the URL to the clipboard
      await navigator.clipboard.writeText(BookCardUrl);
      toast({
        title: "Booking link copied",
        description: "Booking link copied successfully to clickboard.",
        variant: "default",
      });
    } catch (err) {
      console.error("Failed to copy booking link: ", err);
    }
  }

  return (
    <div>
      <Dialog open={isDialogOpen} onClose={closeDialog}>
        {/* <DialogTrigger asChild>
          <Button
            size="xl"
            variant="outline"
            className="text-lg rounded-lg"
            onClick={openDialog}
          >
            <p className={blue ? "text-blue" : ""}>Get verified </p>
            <BsFillSendArrowDownFill
              color={blue ? "#0096FF" : "#0096FF"}
              className="ml-2 h-4 w-4"
            />
          </Button>
        </DialogTrigger> */}
        <DialogContent className="sm:max-w-[425px] rounded-md">
          <DialogTitle className="flex justify-between">
            {" "}
            Verify profile
            {/* <DialogClose onClick={closeDialog} asChild>
              <ImCross size={12} />
            </DialogClose> */}
          </DialogTitle>
          <DialogDescription>
            Congratulations {userData.name} 🎉, final step, provide a valid ID,
            social contact and payment details to complete setup.
          </DialogDescription>

          <div>
            <Label className="text-lg">
              <span className="text-blue font-medium">Booking link</span>
            </Label>
            <div className=" flex items-center space-x-4 rounded-md border px-3 py-4 bg-inputbackground">
              {/* <IoFlash /> */}
              <div className="flex-1 ">
                <p className="text-sm font-medium leading-none">
                  qikelink.com/book/{user.id}
                </p>
              </div>
              <button
                onClick={() => copyBookingLink()}
                size="icon"
                variant="outline"
                type="button"
              >
                <BsCopy />
              </button>
            </div>
            {/* <p className="text-darktext text-base ">Share link to socials to start recieving requests</p> */}
          </div>

          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* personal details
            <div>
              <div className="">
                <div>
                  <Label className="font-semibold ">Areas of expertise</Label>
                  <Select
                    className="bg-inputbackground active:bg-inputbackground mt-1"
                    isMulti={true}
                    autoFocus={true}
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                  />
                </div>
              </div>
            </div> */}

            {/* Achievements section */}
            <div>
              <Label className="font-semibold ">Valid ID</Label>
              <Input
                name="id"
                type="file"
                className=" bg-inputbackground mt-1 "
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            {/* Time slot section */}
            <div>
              <Label className="font-semibold ">
                Social handle (X, facebook etc.)
              </Label>
              <Input
                name="contact"
                type="text"
                placeholder="Social contact"
                className=" bg-inputbackground mt-1 "
                value={formData.contact}
                onChange={handleChange}
              />
            </div>

            {/* Questions section */}
            <div>
              <Label className="font-semibold ">Payment details</Label>
              <Input
                name="account"
                type="text"
                placeholder="Payment account and bank"
                className=" bg-inputbackground mt-1 "
                value={formData.account}
                onChange={handleChange}
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                size="xl"
                className=" rounded-lg text-lg w-full mt-3"
                type="button"
                onClick={handleNavigate}
              >
                Skip for now
              </Button>

              <Button
                size="xl"
                className="bg-blue hover:bg-darkblue rounded-lg text-lg w-full mt-3"
                type="submit"
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
