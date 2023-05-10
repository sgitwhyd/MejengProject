import mejengWhite from "@/assets/mejeng-logo-white.svg";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar({ title, image, href, icon, tooltip }) {
  return (
    <div className="relative hidden h-full w-full basis-1/2 flex-col items-center justify-center text-white md:flex">
      <div className="relative z-50 flex flex-col items-center justify-center text-center ">
        <h1 className="pb-4 text-3xl font-semibold lg:text-4xl">{title}</h1>
        <Image
          src={mejengWhite}
          alt="mejeng logo"
          className="w-40 lg:w-[351px]"
        />
      </div>
      <div className="absolute brightness-50">
        <Image
          alt={image.alt}
          src={image.src}
          className="h-screen"
          loading="lazy"
        />
      </div>
      <Link
        href={`${href}`}
        className="tooltip tooltip-right absolute top-5 left-5 rounded-full bg-white p-2 text-black hover:text-black"
        data-tip={tooltip}
      >
        {icon}
      </Link>
    </div>
  );
}
