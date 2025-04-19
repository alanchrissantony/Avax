import type {Metadata} from "next";


export const metadata: Metadata = {
  title: 'Account Avax - Subscription',
}

export default function ArtistsLayout({
                                        children,
                                      }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section>{children}</section>
  );
}
