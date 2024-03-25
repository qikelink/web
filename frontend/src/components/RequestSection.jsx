import React from "react";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const data = [1, 2, 3];

const RequestSection = () => {
  return (
    <div className="py-2">
      <div className="flex justify-between items-center">
        <h2 className="text-base">Meeting Requests</h2>
      </div>
      {data.map((item, index) => (
        <Alert
          key={index}
          className="my-2 flex gap-3 item-center justify-between"
        >
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <AlertTitle>Chika Musa Tobi</AlertTitle>
            <AlertDescription>
              CEO and President Nigeria Democratic Republic
            </AlertDescription>
          </div>
          <div className="flex-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Meeting Details</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div>
                  I hope this message finds you well. I admire your expertise in
                  the startup realm and would greatly appreciate the opportunity
                  to seek your guidance on some challenging questions I'm facing
                  with my own startup project. Specifically, I'm interested in
                  discussing strategies for sustainable growth, market trends,
                  common pitfalls, and leveraging technology. Your insights
                  would be invaluable, and I'm flexible to meet at your
                  convenience, whether virtually or otherwise. Thank you for
                  considering my request, and I look forward to the possibility
                  of connecting with you soon.
                </div>
                <DialogFooter>
                  <Button className="bg-red" type="submit">
                    Reject
                  </Button>
                  <Button className="bg-green-500" type="submit">
                    Accept
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </Alert>
      ))}
      <div className="flex flex-end hidden">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default RequestSection;
