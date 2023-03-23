import mejengWhite from "@/assets/mejeng-logo-white.svg";
import Image from "next/image";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar(props) {
  return (
    <div className="flex h-full w-full basis-1/2 flex-col items-center justify-center text-white">
      <div className="relative z-50 text-center">
        <h1 className="pb-4 text-4xl font-semibold">{props.title}</h1>
        <Image src={mejengWhite} alt="mejeng logo" width={351} />
      </div>
      <div className="absolute brightness-50">
        <Image
          src={props.bgImage}
          alt={props.bgImageTitle}
          className="h-screen"
        />
      </div>
      <Link
        href="/"
        className="tooltip tooltip-right absolute top-5 left-5 rounded-full bg-white p-2 text-black "
        data-tip="Back to home"
      >
        <FaHome className="h-6 w-6" />
      </Link>
    </div>
  );
}
