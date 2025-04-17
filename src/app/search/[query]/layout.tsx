"use client";

import SearchFilters from "@/components/ui/SearchFilters";
import MainSection from "@/components/general/main-section";
import ContentSection from "@/components/general/content-section";


export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MainSection bgColor="#161616">
      <ContentSection className="mt-4">
        <SearchFilters/>
        {children}
      </ContentSection>
    </MainSection>
  );
}
