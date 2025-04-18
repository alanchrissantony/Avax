"use client";

import MainSection from "@/components/general/main-section";
import ProtectRouter from "@/components/utils/ProtectRouter";


export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectRouter>
      <MainSection bgColor="#161616">
          {children}
      </MainSection>
    </ProtectRouter>
  );
}
