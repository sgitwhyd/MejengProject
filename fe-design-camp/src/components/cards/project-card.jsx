import { useState } from "react";
import Image from "next/image";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { HiFolderPlus } from "react-icons/hi2";

export default function ProjectCard(props) {
  const [hover, setHover] = useState(false);

  const mouseEnter = () => {
    setHover(true);
  };

  const mouseLeave = () => {
    setHover(false);
  };

  return (
    <div>
      <div
        className="relative h-56 w-[297px] rounded-xl bg-slate-400"
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        <Image
          src={props.srcPostImage}
          alt={props.altPostImage}
          width={300}
          height={225}
          className="h-56 w-[297px] rounded-xl object-cover"
        />
        {hover && (
          <div className="absolute inset-0 flex h-full w-full cursor-pointer items-end justify-center rounded-xl bg-gradient-to-b from-transparent via-transparent to-black/60 p-5 font-semibold text-white transition-all duration-300 ease-in-out">
            <div className="flex w-full items-center justify-between gap-3">
              <h1 className="truncate">{props.title}</h1>
              <div className="flex items-center justify-end gap-2">
                <button className="rounded-lg bg-white p-2 text-[#6E6D7A] transition-all hover:bg-gray-200">
                  <HiFolderPlus className="h-5 w-5 " />
                </button>
                <button className="rounded-lg bg-white p-2 text-[#6E6D7A] transition-all hover:bg-gray-200">
                  <AiFillHeart className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center justify-start gap-2">
          <Image
            src={props.srcAvatarPost}
            alt={props.altAvatarPost}
            width={26}
            height={26}
            className="rounded-full"
          />
          <h4 className="font-semibold">{props.authorPost}</h4>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center justify-center gap-1 text-[#B5B5B5]">
            <button>
              <AiFillHeart className="h-5 w-5 transition-all duration-300 hover:text-secondary" />
            </button>
            <p className="font-medium">{props.likePost}</p>
          </div>
          <div className="flex items-center justify-center gap-1 text-[#B5B5B5]">
            <AiFillEye className="h-5 w-5   transition-all duration-300 hover:text-secondary" />
            <p className="font-medium">{props.viewPost}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
