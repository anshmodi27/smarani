"use client";

import {
  ChevronDown,
  ChevronRight,
  Eraser,
  LucideIcon,
  Plus,
  Trash,
} from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { create, archive } from "../../../../convex/documents";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";

interface ItemProps {
  id?: Id<"documents">;
  documentIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: String;
  onClick?: () => void;
  icon: LucideIcon | string;
}

const Item = ({
  label,
  onClick,
  icon: Icon,
  active,
  documentIcon,
  isSearch,
  level = 0,
  expanded,
  onExpand,
  id,
}: ItemProps) => {
  const create = useMutation(api.documents.create);
  const archive = useMutation(api.documents.archive);
  const router = useRouter();

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ id }).then(() => {
      router.push("/documents");
    });
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note Moved to trash",
      error: "Failed to archive Note",
    });
  };

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const onCreate = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = create({ title: "Untitled", parentDocument: id }).then(
      (documentId) => {
        if (!expanded) {
          onExpand?.();
        }
        router.push(`/documents/${documentId}`);
      }
    );
    toast.promise(promise, {
      loading: "Creating...",
      success: "Note created",
      error: "Failed to create Note",
    });
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center font-medium",
        active && "bg-primary/5 text-primary"
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm mr-1 hover:bg-neutral-300 dark:hover:bg-neutral-600"
          onClick={handleExpand}
        >
          <ChevronIcon className="h-4 w-4 shrink-0" />
        </div>
      )}
      {documentIcon ? (
        <div className="shrink-0 text-[18px] mr-2">{documentIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] w-[18px] mr-2" />
      )}
      <span className="truncate">{label}</span>
      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 text-[12px] text-muted-foreground font-cabin">
          <span className="text-xs">⌘</span>K
        </kbd>
      )}
      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          <div
            role="button"
            onClick={onArchive}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto"
          >
            <Eraser className="h-4 w-4 text-red-500" />
          </div>
          <div
            role="button"
            onClick={onCreate}
            className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            <Plus className="h-4 w-4 text-muted-foreground hover:text-primary" />
          </div>
        </div>
      )}
    </div>
  );
};
export default Item;

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 25}px` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-[30%]" />
    </div>
  );
};
