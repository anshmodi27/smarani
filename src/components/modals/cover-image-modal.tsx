"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useCoverImage } from "../../../hooks/use-cover-image";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "../../../convex/_generated/dataModel";
import { SingleImageDropzone } from "../single-image-dropzone";

const CoverImageModal = () => {
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const update = useMutation(api.documents.update);
  const coverImage = useCoverImage();

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const res = await edgestore.publicFiles.upload({
        file,
        options: { replaceTargetUrl: coverImage.url },
      });

      await update({
        id: params.documentId as Id<"documents">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  return (
    <Dialog
      open={useCoverImage().isOpen}
      onOpenChange={useCoverImage().onClose}
    >
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg text-center font-semibold font-cabin">
            Cover Image
          </h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  );
};
export default CoverImageModal;
