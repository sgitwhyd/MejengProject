import { useState } from "react";
import { FaReply } from "react-icons/fa";
import CommentInput from "./comment-input";
import { useSelector } from "react-redux";
import { selectAuth } from "@/store/auth/auth.selector";
import Link from "next/link";

export default function CommentList(props) {
  const [isReply, setIsReply] = useState(false);

  const { user, body, id, repliesComment } = props;
  const { login } = useSelector(selectAuth);

  return (
    <>
      <div className="mb-3 flex w-full gap-2">
        <div>
          <div className="avatar">
            <div className="w-[50px] rounded-full">
              <img
                src={
                  user.profile_image.includes("avatars")
                    ? user.profile_image
                    : `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${user.profile_image}`
                }
                alt={user.name}
              />
            </div>
          </div>
        </div>
        <div className="ml-6">
          <p
            className="mb-2 w-[150px] truncate text-left font-semibold"
            title={user.name}
          >
            {user.name}
          </p>
          <p className="mb-1 text-sm">{body}</p>
          {login ? (
            <button
              onClick={() => setIsReply(!isReply)}
              className="flex items-center gap-2 rounded-md bg-primary px-3 py-1 text-xs text-white"
            >
              <FaReply />
              Reply
            </button>
          ) : null}
        </div>
      </div>
      <div className="ml-12 flex w-full flex-col items-center justify-center">
        {isReply ? <CommentInput type="child" commentParentId={id} /> : null}
      </div>
      <div className="ml-20 mb-5">
        {repliesComment
          ? repliesComment.map((reply, index) => (
              <div key={index} className="mt-5 flex w-full gap-2">
                <div>
                  <div className="avatar">
                    <div className="w-[50px] rounded-full">
                      <img
                        src={
                          reply.user.profile_image.includes("avatars")
                            ? reply.user.profile_image
                            : `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${reply.user.profile_image}`
                        }
                        alt={reply.user.name}
                      />
                    </div>
                  </div>
                </div>
                <div className="ml-6">
                  <p
                    className="mb-2 w-[150px] truncate text-left font-semibold"
                    title={reply.user.name}
                  >
                    {reply.user.name}
                  </p>
                  <p className="mb-1 text-sm">{reply.body}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </>
  );
}
