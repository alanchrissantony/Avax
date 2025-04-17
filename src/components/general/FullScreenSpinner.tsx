import Spinner from "@/components/general/Spinner";

export default function FullScreenSpinner({className}: {className?: string}) {
  return (
    <div className={`w-full min-h-[60dvh] flex items-center justify-center px-4 ${className}`}>
      <Spinner/>
    </div>
  )
}