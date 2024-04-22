import React from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@/contexts/user-context";
import { createNotification, createSession, getNotifications } from "../../../backend/src/pocketbase";

const TwitterDMButton = ({
  recipientId,
  message,
  requestAs,
  sessionTime,
  sessionDate,
  purpose,
  data,
}) => {
  const { toast } = useToast();
  const { user, createdOrganization, setNotifications } = useUser();
  const handleButtonClick = () => {
    if (
      requestAs === "" ||
      sessionDate === "" ||
      sessionTime === "" ||
      purpose === ""
    ) {
      toast({
        title: "Please provide all values",
        description: "Sorry all input fields are required.",
        variant: "destructive",
      });
      return;
    }

    const orgId = requestAs === "Individual" ? undefined : requestAs;
    let date = sessionDate
      ? new Date(
          sessionDate.getTime() - sessionDate.getTimezoneOffset() * 60000
        ).toISOString()
      : new Date().toISOString();

    const requestMessageReceiver = `Hello you have received a session request from ${user.name}, accept or reject request from session requests under manager section.`;
    const requestMessageSender = `Hello you have requested a session with ${data.username}, you would be notified as soon as session is approved.`;

    createSession(
      data.id,
      data.rating,
      orgId,
      purpose,
      sessionTime,
      date,
      user.username,
      user.bio
    ).then(() => {
      createNotification(
        "Session Request",
        requestMessageSender,
        requestMessageReceiver,
        undefined,
        data.expand.users.id,
        orgId
      ).then(() => {
        getNotifications(user.id, user.email)
          .then((res) => {
            setNotifications(res);
          })
          .catch((error) => {
            console.error("Error fetching notifications data:", error);
          });
      });
    });

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
