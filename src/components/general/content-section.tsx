import Footer from "@/components/general/Footer";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ContentSection({
                                         children,
                                         className,
                                       }: Props) {
  return (
    <>
      <div className="space-y-8">
        <div className={`mx-2 my-6 space-y-8 ${className}`}>
          {children}
        </div>
        <Footer/>
      </div>
    </>
  )
}