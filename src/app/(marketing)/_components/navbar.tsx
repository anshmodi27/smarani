"use client";
import { cn } from "@/lib/utils";
import { UseScrollTop } from "../../../../hooks/use-scroll-top";
import Logo from "./logo";
import { ModeToggle } from "@/components/mode-toggle";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = UseScrollTop();

  return (
    <div
      className={cn(
        "z-50 bg-background/50 dark:bg-background/50 backdrop-blur-md fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div className="md:ml-auto justify-between w-full flex items-center gap-x-2">
        <Logo />
        <div className="justify-center flex items-center gap-x-2">
          {isLoading && <Spinner />}
          {!isAuthenticated && !isLoading && (
            <>
              <SignInButton afterSignInUrl="/documents">
                <Button variant={"ghost"} size="sm">
                  Login
                </Button>
              </SignInButton>
            </>
          )}
          {isAuthenticated && !isLoading && (
            <>
              <Button variant={"ghost"} size="sm" asChild>
                <Link href="/documents" className="font-kalam">
                  Enter&nbsp;<span className="font-kalam">स्मरणी</span>
                </Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
export default Navbar;
