"use client";
import DOMPurify from "dompurify";

type EmailBodyPreviewProps = {
  content: string;
};

export default function EmailBodyPreview({ content }: EmailBodyPreviewProps) {
  if (!content) return <div />;
  const htmlContent = DOMPurify.sanitize(content, {
    USE_PROFILES: { html: true },
    WHOLE_DOCUMENT: true,
  });
  return (
    <iframe
      title="Email Preview"
      srcDoc={htmlContent}
      style={{ height: "100%", width: "100%", overflow: "auto" }}
    />
  );
}
