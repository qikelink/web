"use client";

import React from "react";
import { Signup, login } from "../../../backend/src/pocketbase";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";

export default function SignInTab() {
  const [selected, setSelected] = React.useState("login");
  const [isSignIn, setIsSignIn] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const history = useRouter();
  const { setIsUserValid } = useAuth();

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
  };

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

    setIsLoading(true); // Set loading state when the form is submitted

    if (selected === "login") {
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
     
    } else {
      Signup(email, password)
        .then(() => {
          //   toggleMode();
          // toast({
          //     title: "Account created",
          //     description: "Account created successfully! Login with new credentials.",
          //     variant: "default",
          // });
          console.log('success!!')
        })
        .catch((error) => {
          // toast({
          //     title: "Failed to create account",
          //     description: "Sorry an error just occurred! please try again.",
          //     variant: "destructive",
          // });
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

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form
                className="flex flex-col gap-4 "
                onSubmit={handleFormSubmit}
              >
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    {isloading ? "Logging in.." : "Login"}
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form
                className="flex flex-col gap-4 h-[300px]"
                onSubmit={handleFormSubmit}
              >
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                  {isloading ? "Siging up.." : "Sign up"}
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
