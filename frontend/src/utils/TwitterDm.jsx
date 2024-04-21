import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const TwitterDMButton = ({
  recipientId,
  message,
  requestAs,
  sessionTime,
  sessionDate,
  purpose,
}) => {
  const { toast } = useToast();
  const handleButtonClick = () => {
    if (requestAs === '' || sessionDate === '' || sessionTime === '' || purpose === '') {
      toast({
        title: "Please provide all values",
        description: "Sorry all input fields are required.",
        variant: "destructive",
      });
      return;
    }

    const twitterDeepLink = `twitter://messages/compose?recipient_id=${recipientId}&text=${encodeURIComponent(
      message
    )}`;

    const twitterWebUrl = `https://twitter.com/messages/compose?recipient_id=${recipientId}&text=${encodeURIComponent(
      message
    )}`;

    // Check if the device supports deep linking and the Twitter app is installed
    const isTwitterAppInstalled =
      /(iPhone|iPod|iPad|Android)/.test(navigator.userAgent) &&
      window.location.href.indexOf("http") !== 0;

    if (isTwitterAppInstalled) {
      // Attempt to open the Twitter deep link
      window.location.href = twitterDeepLink;
    } else {
      // If the Twitter app is not installed, open the Twitter website in a new tab
      window.open(twitterWebUrl, "_blank");
    }
  };

  return (
    <Button
      size="xl"
      type="button"
      className="bg-blue hover:bg-darkblue rounded-lg text-lg w-full mt-3"
      onClick={handleButtonClick}
    >
      Request
    </Button>
  );
};

export default TwitterDMButton;
