import React from "react";
import BrandLogo from "../brand-logo";
import { ThemeToggler } from "@email-scheduler/ui";

export default function TopBar() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-2 flex items-center justify-between">
        <div className="text-3xl">
          <BrandLogo />
        </div>
        <div>
          <ThemeToggler />
        </div>
      </div>
    </header>
  );
}
