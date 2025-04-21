import type {Metadata} from "next";
import ProtectRouter from "@/components/utils/ProtectRouter";


export const metadata: Metadata = {
  title: 'Avax - My Playlist'
}

export default function Layout({
                                          children,
                                        }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectRouter>
      {children}
    </ProtectRouter>
  );
}
