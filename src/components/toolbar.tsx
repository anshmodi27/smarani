"use client";

import { ImageIcon, Smile, X } from "lucide-react";
import { Doc } from "../../convex/_generated/dataModel";
import IconPicker from "./icon-picker";
import { Button } from "./ui/button";
import { ElementRef, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "../../hooks/use-cover-image";

interface ToolbarProps {
  initialData: Doc<"documents">;
  preview?: boolean;
}

const Toolbar = ({ initialData, preview }: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);

  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  return (
    <div className="group relative pl-[54px]">
      {!!initialData.icon && !preview && (
        <div className="flex items-center gap-x-2 group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-7xl hover:opacity-75 transition cursor-pointer">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            onClick={onRemoveIcon}
            className="bg-[#EF4040]/95 hover:bg-[#EF4040] rounded-full opacity-0 group-hover/icon:opacity-100 transition text-xs"
            size={"icon"}
          >
            <X className="w-6 h-6" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-">
        {!initialData.icon && !preview && (
          <IconPicker onChange={onIconSelect} asChild>
            <Button variant={"outline"} size="sm">
              <Smile className="w-4 h-4 mr-2" />
              Add Icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button variant={"outline"} size="sm" onClick={coverImage.onOpen}>
            <ImageIcon className="w-4 h-4 mr-2" />
            Add Cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextareaAutosize
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(event) => onInput(event.target.value)}
          className="text-5xl font-medium bg-transparent break-words outline-none resize-none text-[#3f3f3f] dark:text-[#cfcfcf]"
        />
      ) : (
        <div
          onClick={enableInput}
          className="text-5xl font-medium break-words outline-none pb-[11.5px] text-[#3f3f3f] dark:text-[#cfcfcf]"
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
};
export default Toolbar;
