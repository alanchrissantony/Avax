import type {Metadata} from "next";


export const metadata: Metadata = {
  title: 'Avax - Albums'
}

export default function TracksLayout({
                                          children,
                                        }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}
