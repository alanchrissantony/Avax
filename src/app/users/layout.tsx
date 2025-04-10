import type {Metadata} from "next";


export const metadata: Metadata = {
  title: 'Avax - Users'
}

export default function UsersLayout({
                                          children,
                                        }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}
