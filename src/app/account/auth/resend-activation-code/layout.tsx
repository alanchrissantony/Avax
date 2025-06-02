import type {Metadata} from "next";


export const metadata: Metadata = {
  title: 'Reset Activation Code - Spotify'
}

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
    </>
  );
}
