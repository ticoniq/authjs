"use client";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "../ui/dropdown-menu";

import {
  Avatar,
  AvatarImage,
  AvatarFallback
} from "../ui/avatar";
import { ExternalLinkIcon, UserIcon } from "lucide-react";
import { useCurrentUser } from "@/hooks/userCurrentUser";
import LogoutButton from "./logoutButton";

type Props = {}

function UserButton({ }: Props) {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-teal-500">
            <UserIcon className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end">
        <LogoutButton>
          <DropdownMenuItem>
            <ExternalLinkIcon className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton