import React, { useState, useEffect } from "react";
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
  getGoogle,
  isUserValid,
  login,
  Signup,
  toggleGoogle,
} from "../../../../backend/src/pocketbase";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { CgProfile } from "react-icons/cg";
import { Separator } from "../ui/separator";
import { useToast } from "../ui/use-toast";
import { ImCross } from "react-icons/im";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../../lib/auth";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import googleLogo from "../../../public/google.png";

const LoginDialog = ({
  loginText = "Sign In",
  buttonColor = "bg-blue",
  buttonHoverColor = "bg-lightblue2",
  buttonSize = "sm",
  textHoverColor = "text-primary",
}) => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [password, setPassword] = useState("");
  const [comfirmPass, setComfirmPass] = useState("");
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isloadingGoogle, setIsLoadingGoogle] = useState(false);
  const history = useRouter();
  const { toast } = useToast();
  const { setIsUserValid } = useAuth();
  const { data: session } = useSession();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showComfirmPass, setShowComfirmPass] = useState(false);

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
    <Dialog>
      <DialogTrigger>
        <Button
          type="button"
          size={buttonSize}
          className={`w-full ${buttonColor} text-secondary hover:${textHoverColor} hover:${buttonHoverColor} rounded-md text-lg`}
        >
          <CgProfile className="mr-2 h-4 w-4" />
          {loginText}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-md">
        <DialogHeader className="mt-2 mb-2">
          <DialogTitle className="flex justify-between">
            {" "}
            {isSignIn ? "Sign In" : "Sign Up"}{" "}
            <DialogClose asChild>
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

export default LoginDialog;
