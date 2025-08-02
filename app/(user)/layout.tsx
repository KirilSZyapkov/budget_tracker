import React from "react";

import Header from "@/components/shared/Header";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  )
}