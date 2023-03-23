import React from "react";
import Image from "next/image";
import { AiFillEye, AiFillHeart } from "react-icons/ai";

export default function ProjectCard(props) {
  return (
    <div>
      <div className="h-56 w-[297px] rounded-xl bg-slate-400">
        <Image
          src={props.srcPostImage}
          alt={props.altPostImage}
          width={300}
          height={225}
          className="h-56 w-[297px] rounded-xl object-cover"
        />
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
        <div className="flex gap-5">
          <div className="flex items-center justify-center gap-1 text-[#B5B5B5]">
            <AiFillHeart className="h-5 w-5" />
            <p className="font-medium">{props.likePost}</p>
          </div>
          <div className="flex items-center justify-center gap-1 text-[#B5B5B5]">
            <AiFillEye className="h-5 w-5" />
            <p className="font-medium">{props.viewPost}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
