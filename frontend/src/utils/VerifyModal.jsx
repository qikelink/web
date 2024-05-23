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
import Select from "react-select";
import { payment } from "@/dummy_api/dataSet";

const options = payment.map((item) => ({ value: item, label: item }));

const VerifyModal = ({ blue, userData }) => {
  const [file, setFile] = useState("");
  const [formData, setFormData] = useState({
    contact: "",
    account: "",
  });
  const [selectedOption, setSelectedOption] = useState(null);

  const { toast } = useToast();

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

    verifyRequest(
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

            {/* Payment method */}
            <div>
              <div className="">
                <div>
                  <Label className="font-semibold ">Payment method</Label>
                  <Select
                    className="bg-inputbackground active:bg-inputbackground mt-1"
                    autoFocus={true}
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                  />
                </div>
              </div>
            </div>

            {/* Questions section */}
            <div>
              <Label className="font-semibold">Payment details</Label>
              <Input
                name="account"
                type="text"
                placeholder="Email or Payment account and bank"
                className=" bg-inputbackground mt-1 "
                value={formData.account}
                onChange={handleChange}
              />
            </div>
            <DialogFooter>
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

export default VerifyModal;
