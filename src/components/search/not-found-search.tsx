import Link from "next/link";
import {Button} from "@/components/ui/button";


interface Props {
  type: string;
  search: string;
}

export default function NotFoundSearch({type, search}: Props) {

  const decodedSearch = decodeURIComponent(search);

  return (
    <div className="flex min-h-[50dvh] flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mt-4 font-bold tracking-tight text-foreground text-2xl">
          {`No ${type} found for "${decodedSearch}"`}
        </h1>
        <p className="mt-2 text-white/90 text-md">
          Please make sure your words are spelled correctly, or use fewer or different keywords.
        </p>
        <div className="mt-8">
          <Link
            href={`/search/${search}`}
          >
            <Button className="uppercase rounded-full bg-white text-black text-md font-semibold" size="lg">
              See All
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}