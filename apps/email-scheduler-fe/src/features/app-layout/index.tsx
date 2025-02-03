import React from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="text-2xl mb-4 border-b pb-4">Campaigns</div>
      {children}
    </div>
  );
}
