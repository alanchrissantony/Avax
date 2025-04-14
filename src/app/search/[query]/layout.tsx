import type {Metadata} from "next";
import SearchFilters from "@/components/ui/SearchFilters";
import MainSection from "@/components/general/main-section";
import Footer from "@/components/general/Footer";


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
      <div className="mx-6 my-6 mt-4 space-y-8">
        <SearchFilters/>
        {children}
        <Footer/>
      </div>
    </MainSection>
  );
}
