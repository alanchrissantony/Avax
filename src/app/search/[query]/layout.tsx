import type {Metadata} from "next";
import SearchFilters from "@/components/ui/SearchFilters";
import MainSection from "@/components/general/main-section";
import ContentSection from "@/components/general/content-section";


export const metadata: Metadata = {
  title: 'Avax - Search'
}

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
