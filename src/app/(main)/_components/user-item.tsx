"use client";
import { ChevronsLeftRight } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";

const UserItem = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="h-7 w-7">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>
            <p className="text-start font-medium line-clamp-1">
              {user?.fullName}&apos;s
              <span className="font-kalam">&nbsp;स्मरणी</span>
            </p>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-ellipsis h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="start"
        alignOffset={11}
        forceMount
      >
        <div className="flex flex-col justify-between space-x-1 p-2 font-cabin">
          <p className="text-md font-medium leading-none line-clamp-1">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center justify-start gap-x-2">
            <div className="rounded-md p-1">
              <Avatar className="h-8 w-8 ">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user?.fullName}&apos;s
                <span className="font-kalam">&nbsp;स्मरणी</span>
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer w-full">
          <SignOutButton>Log Out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserItem;
