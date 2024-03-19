import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { login, Signup } from "../../../../backend/src/pocketbase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";

const LoginDialog = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isloadingGoogle, setIsLoadingGoogle] = useState(false);
  const history = useRouter();
  const { toast } = useToast();
  const { setIsUserValid } = useAuth();

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

    if (isSignIn && password.length < 1 || email.length < 1) {
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
            variant: "default",
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
      Signup(email, password)
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
            description: "Sorry an error just occurred! please try again.",
            variant: "destructive",
          });
          console.error("Signup error:", error);
          // Handle signup error here, such as displaying an error message to the user
        })
        .finally(() => {
          setTimeout(() => {
            setIsLoading(false);
            setEmail("");
            setPassword("");
          }, 2000);
        });
    }
  };

  const handleGoogle = () => {
    setIsLoadingGoogle(true)
  }

  const buttonText = isSignIn ? "Sign In" : "Sign Up";
  const googleText = isSignIn ? "Sign in with google " : "Sign up with google";
  const linkText = isSignIn ? "Create an account" : "Sign In";

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          size="sm"
          className="w-full  dark:text-darkblue text-blue bg-[#b9e3f3] hover:bg-lightblue2 rounded-full text-lg"
        >
          <CgProfile className="mr-2 h-4 w-4" />
          Log in
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader className="mt-4 mb-2">
          <DialogTitle className='text-left'> {isSignIn ? "Log in" : "Sign up"} </DialogTitle>
          <DialogDescription className='text-left'>
            Get started and book a mentor of your choice
          </DialogDescription>
        </DialogHeader>
        <div>
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
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

            <Label htmlFor="password" className="mt-2">
              Password
            </Label>
            <Input
              className="p-6"
              isRequired
              placeholder="Enter password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

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

            <Button
              size="xl"
              className="bg-indigo hover:bg-darkblue text-lg rounded-lg"
              onClick={handleGoogle}
            >
              {isloadingGoogle ? "Signing in.." : googleText}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
