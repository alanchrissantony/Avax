import { Skeleton } from "@/components/ui/skeleton";

export default function GenreCardSkeleton() {
  return (
    <div className="h-full p-2">
      <div className="relative h-[9.5rem] w-full shadow-2xl rounded-lg overflow-hidden">
        <Skeleton className="absolute inset-0 bg-[#202020] opacity-70" />
        <Skeleton className="absolute top-4 left-4 h-6 w-32 rounded-md bg-white/10" />
        <Skeleton className="absolute bottom-[-15px] right-[-20px] rotate-[25deg] bg-white/5 h-32 w-32 rounded-md" />
      </div>
    </div>
  );
}
