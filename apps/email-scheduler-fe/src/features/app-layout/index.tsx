import React from "react";

export default function AppLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div>
      <div className="text-2xl mb-4 border-b pb-4">{title}</div>
      {children}
    </div>
  );
}
