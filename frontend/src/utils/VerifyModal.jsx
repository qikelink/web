import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { BsFillSendArrowDownFill } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { verifyRequest } from "../../../backend/src/pocketbase";
import { useToast } from "@/components/ui/use-toast";

const VerifyModal = ({ blue, userData }) => {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    businessName: "",
    contact: "",
    account: "",
  });

  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      id: file,
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

    verifyRequest(
      userData[0].fullName,
      userData[0].username,
      userData[0].phoneNumber,
      userData[0].bio,
      userData[0].awards,
      formData.businessName,
      formData.contact,
      formData.account,
      file,
      "Free",
      undefined,
      "1"
    )
      .then(() => {
        toast({
          title: "verification request sent",
          description: "verification request sent successfully! .",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to send verification request",
          description: "Sorry an error just occurred! please try again.",
          variant: "destructive",
        });
        console.error("verification error:", error);
      })
      .finally(() => {
        setFormData({
          businessName: "",
          contact: "",
          account: "",
        });
        setFile(null);
      });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="xl" variant="outline" className="text-lg rounded-lg">
            <p className={blue ? "text-blue" : ""}>Get verified </p>
            <BsFillSendArrowDownFill
              color={blue ? "#0096FF" : "#0096FF"}
              className="ml-2 h-4 w-4"
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Verification request</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            verify your account to start earning as a mentor.
          </DialogDescription>

          <form className="space-y-3" onSubmit={handleSubmit}>
            {/* personal details */}
            <div>
              <Label className="font-semibold ">Business name</Label>
              <Input
                name="businessName"
                type="text"
                placeholder="Business name"
                className=" bg-inputbackground mt-1 "
                value={formData.businessName}
                onChange={handleChange}
              />
            </div>

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
              <Label className="font-semibold ">Social contact</Label>
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
                placeholder="Payment account"
                className=" bg-inputbackground mt-1 "
                value={formData.account}
                onChange={handleChange}
              />
            </div>
            <DialogFooter>
              <Button
                size="xl"
                className="bg-blue hover:bg-darkblue rounded-lg text-lg w-full"
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

export default VerifyModal;
