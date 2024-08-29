import React from "react";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserDetailsProps {
  id: number;
  name: string;
  username: string;
  email: string;
  onClose: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  name,
  username,
  email,
  onClose,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-row justify-start items-center gap-5">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://picsum.photos/200" alt="@corlys" />
          <AvatarFallback>AV</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-3">
          <div>
            <h4 className="font-semibold">Name:</h4>
            <p>{name}</p>
          </div>
          <div>
            <h4 className="font-semibold">Username:</h4>
            <p>{username}</p>
          </div>
          <div>
            <h4 className="font-semibold">Email:</h4>
            <p>{email}</p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button onClick={onClose}>Close</Button>
      </DialogFooter>
    </div>
  );
};

export default UserDetails;
