"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { PlusCircle } from "lucide-react";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const DocumentsPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({ title: "Untitled" }).then((documentId) => {
      router.push(`/documents/${documentId}`);
    });

    toast.promise(promise, {
      loading: "Creating...",
      success: "Note created",
      error: "Failed to create Note",
    });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        alt="Empty"
        width={300}
        height={300}
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        alt="Empty"
        width={300}
        height={300}
        className="hidden dark:block "
      />
      <div className="text-xl font-medium font-cabin flex items-end justify-center gap-1">
        <h2>
          Welcome to {user?.firstName}&apos;s
          <span className="font-kalam">&nbsp;स्मरणी&nbsp;</span>
        </h2>
        <Image
          src="/logo.svg"
          alt="Logo"
          width={32}
          height={32}
          className="dark:hidden"
        />
        <Image
          src="/logo-dark.svg"
          alt="Logo"
          width={32}
          height={32}
          className="hidden dark:block"
        />
      </div>
      <Button onClick={onCreate}>
        <PlusCircle className="h-4 w-4 mr-2" />
        Create a Note
      </Button>
    </div>
  );
};
export default DocumentsPage;
