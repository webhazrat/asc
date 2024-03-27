import { ImagePlus } from "lucide-react";
import Image from "next/image";

export default function Thumbnail({ thumbnail, alt }) {
  return (
    <>
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt={alt}
          width={500}
          height={200}
          priority
          className="rounded-lg shadow-md aspect-video w-full object-cover"
        />
      ) : (
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
          <ImagePlus className="stroke-slate-300" />
        </div>
      )}
    </>
  );
}
