"use client";

import { useMutation } from "convex/react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface TitleProps {
  initialData: Doc<"documents">;
}

const Title = ({ initialData }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.documents.update);

  const [title, setTitle] = useState(initialData.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({ id: initialData._id, title: event.target.value || "Untitled" });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      //   event.preventDefault();
      disableInput();
    }
  };

  return (
    <div className="flex items-center gap-x-1 font-cabin">
      {!!initialData.icon && (
        <p className="w-6 h-6 flex items-center justify-center">
          {initialData.icon}
        </p>
      )}
      {isEditing ? (
        <Input
          className="h-7 px-2 focus-visible:ring-transparent"
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
        />
      ) : (
        <Button
          variant={"ghost"}
          onClick={enableInput}
          size={"lg"}
          className="h-auto font-normal p-2 h-7"
        >
          <span className="truncate text-[18px]">{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};
export default Title;

Title.Skeleton = function TitleSkeleton() {
  return <Skeleton className="w-32 h-9 rounded-md" />;
};
