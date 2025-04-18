import {Skeleton} from "@/components/ui/skeleton";
import CardItemGrid from "@/components/general/CardItemGrid";

interface IProps {
  type?: "artist" | "other"
}

export default function SkeletonCards({type = "other"}: IProps) {
  return (
    <CardItemGrid>
      {[...Array(5)].map((_, index) => (
        <div key={index} className="p-4">
          <Skeleton className={`h-48 w-full ${type === "other" ? "rounded-md" : "rounded-full"}`}/>
          <Skeleton className="h-6 w-3/4 mt-2 rounded-md"/>
          <Skeleton className="h-4 w-1/2 mt-1 rounded-md"/>
        </div>
      ))}
    </CardItemGrid>
  );
}
