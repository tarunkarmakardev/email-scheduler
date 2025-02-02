"use client";
import { useMounted } from "@email-scheduler/hooks";
import parse from "html-react-parser";

type EmailBodyPreviewProps = {
  content: string;
};

export default function EmailBodyPreview({ content }: EmailBodyPreviewProps) {
  const isMounted = useMounted();
  if (!content || !isMounted) return null;
  return (
    <div className="h-full w-full overflow-auto text-sm">{parse(content)}</div>
  );
}
