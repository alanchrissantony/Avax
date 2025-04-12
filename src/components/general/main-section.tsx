import Header from "@/components/general/Header";


interface Props {
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
  bgGradient?: string;
}

export default function MainSection({
                                      children,
                                      bgColor = "#202020",
                                      className,
                                      bgGradient = '',
                                    }: Props) {
  return (
    <div
      className={`h-full rounded-lg ${className}`}
      style={{
        backgroundImage: `linear-gradient(to bottom, ${bgColor} 0%, #131313 ${bgGradient}, #131313 100%)`,
      }}
    >
      <Header/>
      {children}
    </div>
  )
}