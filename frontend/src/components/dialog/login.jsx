import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { login } from "../../../../backend/src/pocketbase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";

const LoginDialog = () => {
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

    login(email, password, setIsUserValid)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        // toast({
        //     title: "Invalid credentials",
        //     description: "Invalid login credentials! please enter correct details.",
        //     variant: "default",
        // });
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
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          size="sm"
          className="w-full  dark:text-darkblue text-blue bg-[#b9e3f3] hover:bg-lightblue2 rounded-full text-lg"
        >
          <CgProfile className='mr-2 h-4 w-4'/>
          Log in
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader className='mt-10 mb-2'>
          <DialogTitle>Log in </DialogTitle>
          <DialogDescription>
            Get started and book a mentor of your choice
          </DialogDescription>
        </DialogHeader>
        <div>
          <form className="flex flex-col gap-4" onSubmit={handleFormSubmit}>
            <Label htmlFor="email">Email</Label>
            <Input
              isRequired
              placeholder="Enter your email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label htmlFor="password" className='mt-2' >Password</Label>
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
              className="bg-blue hover:bg-darkblue text-lg rounded-lg mt-3"
              type="submit"
            >
              {isloading ? "Logging in.." : "Continue"}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
