import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ListSection from "@/utils/ListSection";
import { sendFeedback } from "../../../backend/src/pocketbase";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

const FeedBackSection = () => {
  const [message, SetMessage] = useState("");
  const { toast } = useToast();

  const handleSendFeedback = (event) => {
    event.preventDefault();

    sendFeedback(message)
      .then(() => {
        toast({
          title: "Feedback sent",
          description: "Feedback sent successfully! .",
          variant: "default",
        });
      })
      .catch((error) => {
        toast({
          title: "Failed to send feedback",
          description: "Sorry an error just occurred! please try again.",
          variant: "destructive",
        });
        console.error("Feedback error:", error);
      })
      .finally(() => {
        SetMessage("");
      });
  };

  return (
    <div className="h-screen relative flex flex-row  py-1 overflow-contain">
      <div className="hidden md:inline w-1/4 ">
        <ListSection />
      </div>

      <form onSubmit={handleSendFeedback} className="grid w-full gap-2">
        <Textarea
          placeholder="Type your message here."
          name="message"
          type="text"
          value={message}
          onChange={(e) => SetMessage(e.target.value)}
        />
        <Button type="submit" className="w-1/4 item-end">
          Send message
        </Button>
      </form>
    </div>
  );
};

export default FeedBackSection;
