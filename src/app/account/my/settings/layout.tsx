import type {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Account Avax | Settings'
}

export default function SettingsLayout({
                                         children,
                                       }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>{children}</section>
  );
}
