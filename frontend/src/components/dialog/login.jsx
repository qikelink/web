import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  getExistingUsers,
  login,
  Signup,
  SignupGoogle,
} from "../../../../backend/src/pocketbase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";
import { ImCross } from "react-icons/im";
import { useSession, signIn, signOut } from "next-auth/react";
import { useSessionContext } from "@/contexts/session-context";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginDialog = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isloadingGoogle, setIsLoadingGoogle] = useState(false);
  const history = useRouter();
  const { toast } = useToast();
  const { setIsUserValid } = useAuth();
  // const { data: session } = useSession();
  // const { session, status } = useSessionContext();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!isSignIn && password.length < 8) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
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

    setIsLoading(true); // Set loading state when the form is submitted

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
          // Handle login error here, such as displaying an error message to the user
        })
        .finally(() => {
          setTimeout(() => {
            setEmail("");
            setPassword("");
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
            setIsLoading(false);
          } else {
            Signup(email, email, password, password)
              .then(() => {
                toggleMode();
                toast({
                  title: "Account created",
                  description:
                    "Account created successfully! Login with new credentials.",
                  variant: "default",
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
                }, 2000);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  };

  const handleGoogle = () => {
    setIsLoadingGoogle(true);
    signIn();
    setTimeout(() => {
      setIsLoadingGoogle(false);
    }, 3000);
  };

  const buttonText = isSignIn ? "Sign In" : "Sign Up";
  const googleText = isSignIn ? "Sign in with google " : "Sign up with google";
  const linkText = isSignIn ? "Create an account" : "Sign In";

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="button"
          size="sm"
          className="w-full bg-blue text-secondary hover:text-primary hover:bg-lightblue2 rounded-md text-lg"
        >
          <CgProfile className="mr-2 h-4 w-4" />
          Log in
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-md">
        <DialogHeader className="mt-2 mb-2">
          <DialogTitle className="flex justify-between">
            {" "}
            {isSignIn ? "Log in" : "Sign up"}{" "}
            <DialogClose asChild>
              <ImCross size={12} />
            </DialogClose>
          </DialogTitle>
          <DialogDescription className="text-left">
            Get started and book a mentor of your choice
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

            <div className="relative">
              <Input
                className="p-6 pr-12"
                isRequired
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <Button
              size="xl"
              className="bg-blue hover:bg-darkblue text-lg rounded-lg mt-3"
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
            className="hidden bg-indigo hover:bg-darkblue text-lg rounded-lg w-full mt-3"
            onClick={handleGoogle}
          >
            {isloadingGoogle ? "Signing in.." : googleText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
