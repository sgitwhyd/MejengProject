import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillEye, AiFillHeart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/user/user.selector";

export default function ProjectCard(props) {
	const [hover, setHover] = useState(false);

	const { userProjectsLiked } = useSelector(selectUser);

	const {
		id,
		title,
		slug,
		categories,
		thumbnail_project_image,
		tools,
		user,
		total_likes,
		total_views,
	} = props;

	const mouseEnter = () => {
		setHover(true);
	};

	const mouseLeave = () => {
		setHover(false);
	};

	return (
		<div className='w-72 rounded-xl bg-white drop-shadow-lg'>
			<div
				className='relative h-52 w-full rounded-t-xl bg-slate-400'
				onMouseEnter={mouseEnter}
				onMouseLeave={mouseLeave}>
				<Image
					src={
						thumbnail_project_image?.includes("loremflickr") ||
						thumbnail_project_image?.includes("picsum")
							? thumbnail_project_image
							: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${thumbnail_project_image}`
					}
					alt={title}
					width={300}
					height={225}
					className='h-52 w-72 rounded-t-xl object-cover'
				/>
				{hover && (
					<Link href={`/project/detail-project/${slug}`}>
						<div className='rounded-t-xlpb-5 absolute inset-0 flex h-full w-full cursor-pointer flex-col items-end justify-between overflow-hidden font-semibold text-white'>
							<div className='right-0 flex items-center justify-center gap-4 text-sm'>
								{tools.map((tool, index) => (
									<div key={index} className='flex  items-center p-1'>
										<img
											src={
												tool?.icon?.includes("lorem")
													? tool?.icon
													: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${tool?.icon}`
											}
											className='h-8 w-8'
											alt=''
										/>
									</div>
								))}
							</div>
						</div>
					</Link>
				)}
			</div>
			<div className='flex w-full flex-col items-center justify-between gap-2 p-3 py-4'>
				<div className='flex w-full items-center justify-between'>
					<div className='flex items-center justify-start gap-2 text-sm'>
						<img
							src={
								user?.profile_image?.includes("avatars")
									? user?.profile_image
									: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${user?.profile_image}`
							}
							alt={props.author}
							width={18}
							height={18}
							className='rounded-full'
						/>
						<h4 className='font-semibold'>{user?.name}</h4>
					</div>
					<div className='flex gap-2'>
						<div className='flex items-center justify-center gap-1 text-sm text-[#B5B5B5]'>
							<div>
								<AiFillHeart
									className={`h-4 w-4 transition-all duration-300 ${
										userProjectsLiked
											?.map((item) => item.ProjectId)
											.includes(id)
											? "text-secondary"
											: ""
									}`}
								/>
							</div>
							<p className='font-medium'>{total_likes}</p>
						</div>
						<div className='flex items-center justify-center gap-1 text-sm text-[#B5B5B5]'>
							<AiFillEye className='h-4 w-4 transition-all duration-300 hover:text-secondary' />
							<p className='font-medium'>{total_views}</p>
						</div>
					</div>
				</div>
				<h3 className='w-full truncate text-start font-bold'>{title}</h3>
			</div>
		</div>
	);
}
