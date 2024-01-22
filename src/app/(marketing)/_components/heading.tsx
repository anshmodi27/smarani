"use client";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useConvexAuth } from "convex/react";
import Link from "next/link";

const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="font-cabin text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Documents, & Plans. Unified. Welcome to&nbsp;
        <span className="font-bold font-kalam underline">स्मरणी</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-semibold font-caveat">
        <span className="font-bold font-kalam">स्मरणी </span>
        is the connected workspace where <br /> better, faster work happens.
      </h3>
      {isLoading && (
        <div className="flex justify-center items-center w-full">
          <Spinner size="lg" />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button className="font-kalam" asChild>
          <Link href={"/documents"}>
            Enter&nbsp;<span className="">स्मरणी</span>
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <SignInButton mode="modal" afterSignInUrl="/documents">
          <Button size="sm">
            Get<span>&nbsp;स्मरणी&nbsp;</span> Free
            <ArrowRightIcon className="h-4 w-4 ml-2" />
          </Button>
        </SignInButton>
      )}
    </div>
  );
};
export default Heading;
