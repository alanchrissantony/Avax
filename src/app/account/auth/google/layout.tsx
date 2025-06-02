import type {Metadata} from "next";
import {Suspense} from "react";


export const metadata: Metadata = {
  title: 'Spotify - Google oAuth2'
}

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>{children}</Suspense>
  );
}
