import {Skeleton} from "@/components/ui/skeleton";

export default function SkeletonTrack() {
  return (
    <div className="grid w-full grid-cols-12 gap-4 p-4">
      {[...Array(8)].map((_, index) => (
        <div key={index}
             className="flex items-center space-x-4 col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-3 bg-[#181818] h-20 w-full rounded-sm shadow-lg">
          <Skeleton className="h-20 w-20 rounded-sm"/>
          <div className="space-y-2">
            <Skeleton className="h-5 w-40 rounded-sm"/>
            <Skeleton className="h-5 w-32 rounded-sm"/>
          </div>
        </div>
      ))}
    </div>
  );
}
