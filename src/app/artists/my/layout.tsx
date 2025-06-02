import type {Metadata} from "next";
import ProtectRouter from "@/components/utils/ProtectRouter";


export const metadata: Metadata = {
  title: 'Spotify | Artists My'
}

export default function ArtistsLayout({
                                        children,
                                      }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectRouter allowedRoles={["Artist"]}>
      {children}
    </ProtectRouter>
  );
}
