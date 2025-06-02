import Image from "next/image";

export default function Layout({
                                 children,
                               }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='bg-black h-full p-8'>
      <div className="w-full h-full bg-black flex items-start justify-center">
        <div className="mx-auto min-h-[70dvh] max-w-xs sm:max-w-sm space-y-6">
          {children}
        </div>
      </div>
      <footer className="h-full">
        <span className="flex items-center justify-center text-center p-8">
        <p className="text-xs max-w-xs text-white/60 text-center">
          This site is protected by reCAPTCHA and the Google
          Privacy Policy and Terms of Service apply.
        </p>
          </span>
      </footer>
    </div>
  );
}
