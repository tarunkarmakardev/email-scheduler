"use client";
import parse from "html-react-parser";

type EmailBodyPreviewProps = {
  content: string;
};

export default function EmailBodyPreview({ content }: EmailBodyPreviewProps) {
  if (!content) return <div />;
  return (
    <div className="h-full w-full overflow-auto text-sm">{parse(content)}</div>
  );
}
