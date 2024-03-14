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
import { Signup } from "../../../../backend/src/pocketbase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";

const CreateAccountDialog = () => {
  const [selected, setSelected] = React.useState("login");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const history = useRouter();
  const { setIsUserValid } = useAuth();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // if (!isSignIn && password.length < 6) {
    //   // toast({
    //   //     title: "Weak Password",
    //   //     description: "Password must be at least 6 characters long",
    //   //     variant: "destructive",
    //   // });
    //   return;
    // }

    setIsLoading(true);

    Signup(email, password)
      .then(() => {
        //   toggleMode();
        // toast({
        //     title: "Account created",
        //     description: "Account created successfully! Login with new credentials.",
        //     variant: "default",
        // });
        console.log("success!!");
      })
      .catch((error) => {
        // toast({
        //     title: "Failed to create account",
        //     description: "Sorry an error just occurred! please try again.",
        //     variant: "destructive",
        // });
        console.error("Signup error:", error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
          setEmail("");
          setPassword("");
        }, 2000);
      });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          size="sm"
          className="w-full text-white bg-blue hover:bg-darkblue rounded-full text-lg"
        >
          Create account
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm ">
        <DialogHeader className="mt-10 mb-2">
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Get started and book a mentor of your choice
          </DialogDescription>
        </DialogHeader>
        <div>
          <form className="flex flex-col gap-4 " onSubmit={handleFormSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
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
              isRequired
              placeholder="Enter password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              size="xl"
              className="bg-blue  hover:bg-darkblue text-lg rounded-lg mt-3"
              type="submit"
            >
              {isloading ? "Signing up.." : "Continue"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccountDialog;
