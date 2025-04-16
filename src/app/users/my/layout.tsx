import type {Metadata} from "next";
import ProtectRouter from "@/components/utils/ProtectRouter";


export const metadata: Metadata = {
  title: 'Avax - Albums'
}

export default function TracksLayout({
                                       children,
                                     }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectRouter allowedRoles={["User"]}>
      {children}
    </ProtectRouter>
  );
}
