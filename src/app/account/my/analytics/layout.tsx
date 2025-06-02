import type {Metadata} from "next";
import ProtectRouter from "@/components/utils/ProtectRouter";

export const metadata: Metadata = {
  title: 'Account Spotify | Analytics'
}

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectRouter allowedRoles={["Artist"]}>
      <section>{children}</section>
    </ProtectRouter>
  );
}
