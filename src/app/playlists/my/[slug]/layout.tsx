import type {Metadata} from "next";
import ProtectRouter from "@/components/utils/ProtectRouter";


export const metadata: Metadata = {
  title: 'Spotify - My Playlist'
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
