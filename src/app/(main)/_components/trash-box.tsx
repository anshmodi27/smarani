"use client";
import { useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import { Search, Trash, Trash2, Undo, Undo2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import ConfirmModal from "@/components/modals/confirm-modal";

const TrashBox = () => {
  const router = useRouter();
  const params = useParams();

  const documents = useQuery(api.documents.getTrash);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState("");

  const filterDocuments = documents?.filter((document) => {
    return document.title.toLowerCase().includes(search.toLowerCase());
  });

  const onClick = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onRestore = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    event.stopPropagation();
    const promise = restore({ id: documentId });
    toast.promise(promise, {
      loading: "Restoring...",
      success: "Note Restored",
      error: "Failed to restore Note",
    });
  };

  const onRemove = (documentId: Id<"documents">) => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: " Failed to delete note.",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex justify-center items-center p-4">
        <Spinner size={"lg"} />
      </div>
    );
  }

  return (
    <div className="font-cabin text-sm relative">
      <div className="flex items-center gap-x-1 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent"
          placeholder="Search by Page Title..."
        />
      </div>
      <div className="mt-2 px-1 pb-1 max-h-52 overflow-y-auto ">
        <p className="hidden last:block text-xs text-center pb-2 text-muted-foreground">
          No document Found.
        </p>
        {filterDocuments?.map((document) => (
          <div
            key={document._id}
            role="button"
            onClick={() => onClick(document._id)}
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="pl-2 truncate">{document.title}</span>
            <div className="flex items-center">
              <div
                className="rounded-sm p-2 group hover:bg-neutral-200 dark:hover:bg-neutral-600"
                onClick={(event) => onRestore(event, document._id)}
                role="button"
              >
                <Undo2 className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div role="button">
                  <Trash2 className="h-4 w-4 text-muted-foreground hover:text-red-500" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
