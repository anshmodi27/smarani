"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import Toolbar from "@/components/toolbar";
import Cover from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { ModeToggle } from "@/components/mode-toggle";
import Logo from "@/app/(marketing)/_components/logo";
import { cn } from "@/lib/utils";
import { UseScrollTop } from "../../../../../../hooks/use-scroll-top";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const scrolled = UseScrollTop();

  const Editor = useMemo(
    () => dynamic(() => import("@/components/Editor"), { ssr: false }),
    []
  );
  const document = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });
  const update = useMutation(api.documents.update);

  const onChange = (content: string) => {
    update({ id: params.documentId, content });
  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Document not found</div>;
  }

  return (
    <div className="font-cabin">
      <div
        className={cn(
          "z-50 bg-background/50 dark:bg-background/50 backdrop-blur-md fixed top-0 flex items-center justify-between w-full p-3",
          scrolled && "border-b shadow-sm"
        )}
      >
        <Logo />
        <h2 className="text-2xl font-bold">{document.title}</h2>
        <ModeToggle />
      </div>
      <main className="pt-16">
        <Cover preview url={document.coverImage} />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
          <Toolbar preview initialData={document} />
          <Editor
            editable={false}
            onChange={onChange}
            initialContent={document.content}
          />
        </div>
      </main>
    </div>
  );
};
export default DocumentIdPage;
