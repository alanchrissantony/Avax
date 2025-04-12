import Image from "next/image";
import Link from "next/link";

interface Props {
  image: any;
  id: number;
  slug?: string;
  altTitle: string;
  color: string;
  heading: string;
  type: string;
}

export default function GenreCards({
                                     image,
                                     id,
                                     slug,
                                     altTitle,
                                     color,
                                     heading,
                                     type,
                                   }: Props) {

  return (
    <Link href={`/${type}/${slug || id}`}>
      <div className={`h-full p-2 rounded-lg cursor-pointer`}>
        <div
          className={`relative h-[9.5rem] w-full shadow-2xl rounded-lg overflow-hidden`}
          style={{
            backgroundColor: color,
          }}
        >
          <div className="absolute inset-0 bg-black opacity-10 z-0"></div>

          <div className="absolute top-4 left-4 text-white font-bold text-[22px] z-10">
            {heading}
          </div>
          {image.length > 0 && (
            <div className="h-full w-full relative">
              <Image
                src={image}
                alt={altTitle}
                height={200}
                width={200}
                className={`absolute bottom-[-15px] right-[-20px] aspect-square object-cover h-32 w-32 rotate-[25deg] shadow-2xl rounded-md`}
              />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
