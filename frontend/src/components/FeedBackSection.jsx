import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ListSection from "@/utils/ListSection";

const FeedBackSection = () => {
  return (
    <div className="h-screen relative flex flex-row  py-1 overflow-contain">
      <div className="hidden md:inline w-1/4 ">
        <ListSection />
      </div>

      <div className="grid w-full gap-2">
        <Textarea placeholder="Type your message here." />
        <Button className="w-1/4 item-end">Send message</Button>
      </div>
    </div>
  );
};

export default FeedBackSection;
