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
    <div className={`mx-6 my-6 space-y-8 ${className}`}>
      {children}
      <Footer/>
    </div>
  )
}