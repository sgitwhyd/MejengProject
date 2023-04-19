import Image from "next/image";
import { useState } from "react";

export default function CommentInput({ authorImage, author }) {
  const [comment, setComment] = useState("");

  return (
    <>
      <div className="flex w-full items-start justify-center gap-5 pb-3">
        <Image
          width={45}
          height={45}
          src={authorImage}
          className="rounded-full"
          alt={author}
        />
        <textarea
          className="textarea-bordered textarea min-h-[140px] w-full"
          placeholder="What are your thoughts on this project?"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
      </div>

      <div className="mt-4 flex items-center justify-end">
        <button
          onClick={() => {
            console.log(comment);
          }}
          className=" w-[200px] rounded-full border border-primary bg-primary p-2 text-white transition-all duration-300 hover:border-primary/80 hover:bg-primary/80 hover:text-white"
        >
          Post a Comment
        </button>
      </div>
    </>
  );
}
