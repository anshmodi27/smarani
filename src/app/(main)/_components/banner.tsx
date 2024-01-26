"use client";

import { useRouter } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";
import { Trash, Delete } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
}

const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: " Failed to delete note.",
    });
    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: " Failed to restore note.",
    });
  };

  return (
    <div className="w-full bg-[#EF4040] text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center font-cabin">
      <span>
        <Trash className="w-4 h-4" />
      </span>
      <p>This Page is in the Trash</p>
      <Button
        onClick={onRestore}
        size={"sm"}
        variant={"outline"}
        className="bg-transparent border-white hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
      >
        Restore Page
      </Button>
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size={"sm"}
          variant={"outline"}
          className="bg-transparent border-white hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal"
        >
          Delete forever
        </Button>
      </ConfirmModal>
    </div>
  );
};
export default Banner;
