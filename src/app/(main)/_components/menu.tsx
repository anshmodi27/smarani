"use client";

import { useRouter } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { Eraser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
  documentId: Id<"documents">;
}

const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();

  const archive = useMutation(api.documents.archive);

  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note Moved to trash",
      error: "Failed to archive Note",
    });

    router.push("/documents");
  };

  return (
    <div>
      <Button
        size={"sm"}
        onClick={onArchive}
        className="bg-[#EF4040]/95 hover:bg-[#EF4040]"
      >
        <Eraser className="w-4 h-4" />
      </Button>
    </div>
  );
};
export default Menu;

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="w-10 h-10 rounded-md" />;
};
