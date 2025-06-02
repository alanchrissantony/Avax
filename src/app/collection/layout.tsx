import type {Metadata} from "next";
import ProtectRouter from "@/components/utils/ProtectRouter";


export const metadata: Metadata = {
  title: 'Spotify - Collection'
}

export default function TracksLayout({
                                       children,
                                     }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectRouter allowedRoles={["User", "Artist"]}>
      {children}
    </ProtectRouter>
  );
}
