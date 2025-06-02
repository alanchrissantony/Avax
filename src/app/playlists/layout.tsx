import type {Metadata} from "next";


export const metadata: Metadata = {
  title: 'Spotify - Playlists'
}

export default function PlaylistsLayout({
                                          children,
                                        }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>{children}</>
  );
}
