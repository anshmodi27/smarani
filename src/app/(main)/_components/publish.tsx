"use client";

import { Doc } from "../../../../convex/_generated/dataModel";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useOrigin from "../../../../hooks/use-origin";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Check, Copy, Globe } from "lucide-react";

interface PublishProps {
  initialData: Doc<"documents">;
}

const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.documents.update);

  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${initialData._id}`;

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Note published!",
      error: "Failed to publish Note",
    });
  };

  const onUnPublish = () => {
    setIsSubmitting(false);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => {
      setIsSubmitting(false);
    });

    toast.promise(promise, {
      loading: "Unpublishing...",
      success: "Note Unpublished!",
      error: "Failed to Unpublish Note",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <Popover>
      <PopoverTrigger className="font-cabin">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center justify-center gap-x-2 text-md"
        >
          <p>Publish</p>
          {initialData.isPublished && (
            <Globe className="w-4 h-4 text-sky-500 animate-spin" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="font-cabin space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="h-4 w-4 animate-spin" />
              <p className="font-medium">
                This <span className="font-kalam">स्मरणी </span> is Live on Web
                .
              </p>
            </div>
            <div className="flex items-center">
              <input
                value={url}
                readOnly
                className="flex-1 px-2 text-xs border rounded-l-md h-8 outline-none"
              />
              <Button
                size="sm"
                onClick={onCopy}
                disabled={copied}
                className="h-8 rounded-l-none"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button
              size="sm"
              onClick={onUnPublish}
              className="w-full bg-[#EF4040]/95 hover:bg-[#EF4040] text-white font-cabin"
              disabled={isSubmitting}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-2">
            <Globe className="h-8 w-8 text-muted-foreground" />
            <p className="font-cabin">
              Publish this <span className="font-kalam">स्मरणी</span>
            </p>
            <span className="font-cabin">
              Share your <span className="font-kalam">स्मरणी </span> with
              Others.
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              size="sm"
              className="w-full font-cabin text-md"
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
export default Publish;
