import type {Metadata} from "next";


export const metadata: Metadata = {
  title: 'Reset Activation Code - Avax'
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
