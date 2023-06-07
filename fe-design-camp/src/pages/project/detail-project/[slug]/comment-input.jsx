import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "@/store/user/user.selector";
import { selectProject } from "@/store/projects/projects.selector";
import { postComment, replyComment } from "@/store/user/user.action";
import { SuccessToast, ErrorToast } from "@/components/toast/alert-taost";
import { getDetail } from "@/store/projects/projects.action";

export default function CommentInput(props) {
	const dispatch = useDispatch();
	const [comment, setComment] = useState("");
	const { user } = useSelector(selectUser);
	const { projectDetail } = useSelector(selectProject);
	const { type, commentParentId } = props;

	const handlePostComment = async () => {
		if (comment === "") return ErrorToast("Comment can't be empty");
		const data = {
			body: comment,
			projectId: projectDetail?.id,
		};
		await dispatch(postComment(data)).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				SuccessToast("Comment posted successfully");
			} else {
				ErrorToast(res.payload.error.message);
			}
		});
		dispatch(
			getDetail({
				slug: projectDetail?.slug,
			})
		);
		setComment("");
	};

	const handleReplyComment = async () => {
		if (comment === "") return ErrorToast("Comment can't be empty");
		await dispatch(
			replyComment({ body: comment, commentId: commentParentId })
		).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				SuccessToast("Reply posted successfully");
			} else {
				ErrorToast(res.payload.error.message);
			}
		});
		dispatch(
			getDetail({
				slug: projectDetail?.slug,
			})
		);
		setComment("");
	};

	return (
		<>
			<div
				className={`flex w-full items-start justify-center gap-5 pb-3 ${
					type === "child" ? "-ml-[90px] lg:ml-16" : null
				}`}>
				<div className='avatar'>
					<div className='w-[50px] rounded-full'>
						<img
							src={
								user?.profile_image.includes("avatars")
									? user?.profile_image
									: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${user?.profile_image}`
							}
							alt={user?.name}
						/>
					</div>
				</div>
				<textarea
					className='textarea-bordered textarea min-h-[140px] w-full'
					placeholder='What are your thoughts on this project?'
					value={comment}
					onChange={(e) => setComment(e.target.value)}></textarea>
			</div>

			<div className='mt-4 flex items-center justify-end'>
				<button
					onClick={type === "child" ? handleReplyComment : handlePostComment}
					className=' w-[200px] rounded-full border border-primary bg-primary p-2 text-white transition-all duration-300 hover:border-primary/80 hover:bg-primary/80 hover:text-white'>
					{type === "child" ? "	Reply Comment" : "Post Comment"}
				</button>
			</div>
		</>
	);
}
