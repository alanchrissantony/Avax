import type {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Account Avax | Artist tracks'
}

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>{children}</section>
  );
}
