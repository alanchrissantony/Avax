import type {Metadata} from "next";

export const metadata: Metadata = {
  title: 'Account Avax | Payment'
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
