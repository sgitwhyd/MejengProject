import Image from "next/image";
import { useState } from "react";
import CommentInput from "./comment-input";

export default function CommentList({ profile_image, name, body }) {
  const [isReply, setIsReply] = useState(false);

  return (
    <>
      <div className="flex w-full items-start justify-center gap-2">
        <Image
          width={45}
          height={45}
          src={profile_image}
          className="rounded-full"
          alt={name}
        />
        <div>
          <p
            className="w-[150px] truncate text-left font-semibold"
            title={name}
          >
            {name}
          </p>
          <p className="text-sm">{body}</p>
          <button
            onClick={() => setIsReply(true)}
            className="rounded-md bg-primary px-2 py-1 text-xs text-white"
          >
            Reply
          </button>
        </div>
      </div>
      <div className="ml-12 flex w-full flex-col items-center justify-center">
        {isReply && <CommentInput authorImage={profile_image} author={name} />}
      </div>
    </>
  );
}
