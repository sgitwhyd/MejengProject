import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import {
	AiFillLike,
	AiFillDislike,
	AiFillHeart,
	AiFillEye,
	AiOutlineArrowRight,
} from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiAlertCircle } from "react-icons/fi";
import CommentInput from "./comment-input";
import CommentList from "./comment-list";
import { useDispatch, useSelector } from "react-redux";
import { selectProject } from "@/store/projects/projects.selector";
import { useState, useEffect } from "react";
import { getDetail } from "@/store/projects/projects.action";
import { selectAuth } from "@/store/auth/auth.selector";
import ProjectCard from "@/components/cards/project-card";
import { viewProject, likeProject, getProfile } from "@/store/user/user.action";
import { selectUser } from "@/store/user/user.selector";
import { SuccessToast, ErrorToast } from "@/components/toast/alert-taost";
import { selectReportCategories } from "@/store/report/report.selector";
import { reportProject } from "@/store/report/report.action";
import { formatedHours } from "@/utils/formated-date";

export default function ProjectDetails() {
	const dispatch = useDispatch();
	const router = useRouter();
	const slug = router.query.slug;

	const [isChoise, setIsChoise] = useState({
		choised: false,
		reportCategory: "",
		reportCategoryId: null,
	});
	const [arrayComment, setArrayComment] = useState([]);

	const { projectDetail, projectByUser, projectByCategory } =
		useSelector(selectProject);
	const { login } = useSelector(selectAuth);
	const { ip_address, userProjectsLiked } = useSelector(selectUser);
	const { reportCategories, loading } = useSelector(selectReportCategories);

	useEffect(() => {
		const getProject = async () => {
			if (slug) {
				await dispatch(getDetail({ slug })).then((res) => {
					if (res.meta.requestStatus === "rejected") {
						router.push("/404");
					}
				});
			}
		};

		getProject();
	}, [slug]);

	useEffect(() => {
		setArrayComment(
			projectDetail?.comment.map((item) => item.repliesComment.length)
		);
	}, [projectDetail]);

	useEffect(() => {
		if (ip_address) {
			dispatch(
				viewProject({
					ip_address,
					projectId: projectDetail?.id,
				})
			);
			setTimeout(() => {
				dispatch(getDetail({ slug }));
			}, 1000);
		}
	}, [projectDetail?.id]);

	const handleOnUserLike = async () => {
		await dispatch(
			likeProject({
				projectId: projectDetail?.id,
			})
		).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				dispatch(getDetail({ slug }));
				return SuccessToast(res.payload.message);
			} else {
				return ErrorToast(res.payload.error.message);
			}
		});

		dispatch(getProfile());
	};

	const handleOnUserReport = async () => {
		await dispatch(
			reportProject({
				projectId: projectDetail?.id,
				reportCategoryId: isChoise.reportCategoryId,
			})
		).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				dispatch(getDetail({ slug }));
				setIsChoise({
					choised: false,
					reportCategory: "",
					reportCategoryId: null,
				});
				return SuccessToast(res.payload.message);
			} else {
				return ErrorToast(
					res.payload.error ? res.payload.error.message : res.payload.message
				);
			}
		});
	};

	return (
		<>
			<Head>
				<title>{projectDetail?.title} - Mejeng</title>
				<meta
					name='description'
					content={`Project ${projectDetail?.title} detail by ${projectDetail?.user.name}`}
				/>
			</Head>
			<section>
				<h1 className='pb-7 text-3xl font-bold uppercase text-primary'>
					{projectDetail?.title}
				</h1>

				<div className='flex items-center justify-start gap-2 pb-3'>
					<div className='avatar'>
						<div className='w-[34px] rounded-full'>
							<img
								src={
									projectDetail?.user?.profile_image?.includes("avatars")
										? projectDetail?.user?.profile_image
										: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${projectDetail?.user?.profile_image}`
								}
								alt={projectDetail?.user?.name}
							/>
						</div>
					</div>
					<p
						className='w-[150px] truncate text-left font-semibold'
						title={projectDetail?.user?.name}>
						{projectDetail?.user?.name}
					</p>
				</div>

				<div className='flex flex-col items-center justify-center lg:px-10'>
					<Image
						src={
							projectDetail?.thumbnail_project_image?.includes("lorem")
								? projectDetail?.thumbnail_project_image
								: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${projectDetail?.thumbnail_project_image}`
						}
						alt='Uploaded file'
						width={1400}
						height={1400}
						className='h-full w-full rounded-xl object-cover'
					/>
					<div className='py-5 text-xl lg:px-12 '>
						<div
							dangerouslySetInnerHTML={{
								__html: projectDetail?.desc,
							}}
						/>
					</div>
					<div className='flex w-full flex-col items-center justify-center gap-10'>
						{projectDetail?.project_image?.map((image, index) => (
							<Image
								src={
									image?.includes("lorem")
										? image
										: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${image}`
								}
								alt='Uploaded file'
								key={index}
								width={1400}
								height={1400}
								className='h-full w-full rounded-xl object-cover'
							/>
						))}
					</div>
				</div>

				<div className='my-7 flex w-full flex-col items-center justify-center gap-8 bg-[#122341] p-8 text-white lg:p-16'>
					<h3 className='text-2xl font-semibold capitalize'>
						{projectDetail?.title}
					</h3>
					{projectDetail?.url !== "" && (
						<p className='text-sm font-medium'>
							If you want to explore a {projectDetail?.title} with all its
							intricate details,{" "}
							<Link
								href={`${projectDetail?.url}`}
								target='_blank'
								rel='noopener noreferrer'
								className='text-white hover:text-white/80'>
								click here.
							</Link>
						</p>
					)}
					<div className='flex flex-col items-center gap-8 lg:flex-row'>
						<button
							className='flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80'
							onClick={handleOnUserLike}>
							{userProjectsLiked
								?.map((item) => item.ProjectId)
								.includes(projectDetail?.id) ? (
								<>
									<AiFillDislike size={18} />
									Unppreciate
								</>
							) : (
								<>
									<AiFillLike size={18} />
									Appreciate
								</>
							)}
						</button>
						<div className='flex gap-8'>
							<div className='flex items-center justify-center gap-1 text-sm text-white'>
								<AiFillHeart className='h-5 w-5 transition-all duration-300 hover:text-gray-300' />
								<p>{projectDetail?.total_likes}</p>
							</div>
							<div className='flex items-center justify-center gap-1 text-sm text-white'>
								<AiFillEye className='h-5 w-5 transition-all duration-300 hover:text-gray-300' />
								<p>{projectDetail?.total_views}</p>
							</div>
						</div>
					</div>
					<div className='flex items-center justify-center gap-2 font-medium'>
						<p className='pr-5'>
							Published : {formatedHours(projectDetail?.createdAt)}
						</p>
					</div>
				</div>

				{/* Comment Section */}
				<div className='flex w-full flex-col items-start justify-center gap-4 lg:flex-row'>
					{/* Comment Field */}
					<div className='w-full border p-10'>
						{!login ? (
							<h1 className='mb-5 font-semibold'>
								Wanna Comment ? <Link href={"/auth/login"}>login first </Link>
							</h1>
						) : null}
						{login ? (
							<>
								<CommentInput />

								<hr className='my-10' />
							</>
						) : null}

						{/* Comment List */}
						<h1 className='mb-5  lg:text-end'>
							{arrayComment?.length === 0
								? projectDetail?.comment.length
								: projectDetail?.comment.length +
								  arrayComment?.reduce((a, b) => a + b, 0)}{" "}
							Comments
						</h1>
						<div className='flex w-full items-center justify-start'>
							{projectDetail?.comment.length === 0 ? (
								<p className='text-[#B5B5B5]'>
									there are no comments on this post yet...
								</p>
							) : (
								<div className=' flex flex-col items-start justify-center'>
									{projectDetail?.comment.map((item, index) => (
										<CommentList key={index} {...item} />
									))}
								</div>
							)}
						</div>
					</div>

					{/* Project Details */}
					<div className='flex w-full flex-col items-center justify-center gap-4 lg:w-1/3 '>
						<div className='flex w-full flex-col items-start justify-center gap-4 border p-4'>
							<h1 className='text-sm font-bold text-[#656470]'>OWNER</h1>
							<div className='flex items-center justify-center gap-2'>
								<div className='avatar'>
									<div className='w-[50px] rounded-full'>
										<img
											src={
												projectDetail?.user.profile_image.includes("avatars")
													? projectDetail?.user.profile_image
													: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${projectDetail?.user.profile_image}`
											}
											alt={projectDetail?.user.name}
										/>
									</div>
								</div>
								<div>
									<p
										className='w-[150px] truncate text-left text-lg font-semibold'
										title={projectDetail?.user.name}>
										{projectDetail?.user.name}
									</p>
									{projectDetail?.user?.country ||
									projectDetail?.user.region ? (
										<p className='inline-flex items-center justify-center text-sm font-medium text-[#9F9F9F]'>
											<MdLocationPin /> {projectDetail?.user.region},{" "}
											{projectDetail?.user.country}
										</p>
									) : null}
								</div>
							</div>
							<Link
								href={`/user/${projectDetail?.user?.slug}`}
								className='flex w-full items-center justify-center gap-2 rounded-full border border-primary bg-primary p-2 text-white transition-all duration-300 hover:border-primary/80 hover:bg-primary/80 hover:text-white'>
								<CgProfile className='h-4 w-4' />
								View Profile
							</Link>
						</div>

						<div className='flex w-full flex-col items-start justify-center gap-3 border p-4'>
							<h1 className='font-bold'>{projectDetail?.title}</h1>
							<div className='flex items-center justify-center gap-2'>
								<div className='flex items-center justify-center gap-1 text-sm text-[#B5B5B5]'>
									<button>
										<AiFillHeart className='h-4 w-4 transition-all duration-300 hover:text-secondary' />
									</button>
									<p className='font-medium'>{projectDetail?.total_likes}</p>
								</div>
								<div className='flex items-center justify-center gap-1 text-sm text-[#B5B5B5]'>
									<AiFillEye className='h-4 w-4 transition-all duration-300 hover:text-secondary' />
									<p className='font-medium'>{projectDetail?.total_views}</p>
								</div>
							</div>
							<p className='text-sm text-[#B5B5B5]'>
								Published: {formatedHours(projectDetail?.createdAt)}
							</p>
							<label
								htmlFor='my-modal-3'
								className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-primary bg-primary/10 p-2 transition-all duration-300 hover:bg-primary hover:text-white'>
								<FiAlertCircle className='h-4 w-4' />
								Report This Project
							</label>
						</div>

						<div className='flex w-full flex-col items-start justify-center gap-5 border p-4'>
							<div className='flex flex-col gap-2 text-sm'>
								<h1 className='text-sm font-bold text-[#656470]'>CATEGORY</h1>
								<p className='text-base font-semibold'>
									{projectDetail?.categories.name}
								</p>
							</div>
							<div className='flex flex-col gap-2 text-sm'>
								<h1 className='font-bold text-[#656470]'>TOOLS</h1>
								{projectDetail?.tools?.map((tool, index) => (
									<div key={index} className='flex items-center gap-[10px]'>
										<img
											src={
												tool.icon.includes("lorem")
													? tool.icon
													: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${tool.icon}`
											}
											width={25}
											height={25}
											alt={tool.name}
										/>
										<p key={index} className='text-base font-semibold'>
											{tool.name}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Related Project by User*/}
				{projectByUser?.length > 2 && (
					<div className='hidden lg:block'>
						<hr className='mb-16 mt-10' />
						<div className='flex items-center justify-between'>
							<h2 className='text-xl font-semibold'>
								More by {projectDetail?.user.name}
							</h2>
							<Link
								href={`/user/${projectDetail?.UserId}`}
								className='flex items-center justify-center gap-1 rounded-lg bg-secondary px-4 py-2 text-sm text-white hover:bg-secondary/80 hover:text-white'>
								View Profile Creator <AiOutlineArrowRight size={15} />
							</Link>
						</div>
						<div className='mt-10 grid grid-cols-4 gap-8'>
							{projectByUser?.map((item, index) => (
								<ProjectCard key={index} {...item} />
							))}
						</div>
					</div>
				)}

				{/* Related Project by Category*/}
				<div className='hidden lg:block'>
					<hr className='mb-16 mt-10' />
					<div className='flex items-center justify-between'>
						<h2 className='text-xl font-semibold'>You might also Like</h2>
						<Link
							href={`/project/discover?category=${projectDetail?.categories.name.toLowerCase()}`}
							className='flex items-center justify-center gap-1 rounded-lg bg-secondary px-4 py-2 text-sm text-white hover:bg-secondary/80 hover:text-white'>
							Find More Like This <AiOutlineArrowRight size={15} />
						</Link>
					</div>
					<div className='mt-10 grid grid-cols-4 gap-8'>
						{projectByCategory?.map((item, index) => (
							<ProjectCard key={index} {...item} />
						))}
					</div>
				</div>

				{/* Modal Report */}
				<input type='checkbox' id='my-modal-3' className='modal-toggle' />
				<div className='modal'>
					<div className='modal-box relative'>
						<label
							htmlFor='my-modal-3'
							onClick={() =>
								setIsChoise({
									choised: false,
									reportCategory: "",
									reportCategoryId: "",
								})
							}
							className='btn-sm btn-circle btn absolute right-2 top-2'>
							✕
						</label>
						<h3
							className={`${
								isChoise.choised ? "mt-5" : null
							} pb-2 text-center text-lg font-bold`}>
							{!isChoise.choised
								? "Why are you reporting this project?"
								: `Continue to report 
                ${projectDetail?.title} with ${isChoise.reportCategory} category ?`}
						</h3>

						<div className='mt-5 flex w-full flex-col items-center justify-center gap-3'>
							{!isChoise.choised
								? reportCategories?.map((item) => (
										<button
											key={item.id}
											onClick={() =>
												setIsChoise({
													choised: !isChoise.choised,
													reportCategory: item.name,
													reportCategoryId: item.id,
												})
											}
											className='mt-2 flex w-full items-center gap-3 rounded-lg bg-gray-100 px-4 py-3'>
											{item.name}
											<AiOutlineArrowRight
												className={`h-[15px] w-[15px] transition-all ${
													isChoise.choised && "rotate-90"
												}`}
											/>
										</button>
								  ))
								: null}
							{isChoise.choised && (
								<div className='flex items-center justify-center gap-3'>
									<button
										onClick={() => setIsChoise(false)}
										className='btn-error btn-sm btn text-white'>
										Cancel
									</button>
									<button
										onClick={handleOnUserReport}
										className={`${
											loading ? "loading" : ""
										} btn-info btn-sm btn text-white`}>
										Process
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
