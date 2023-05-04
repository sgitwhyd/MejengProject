import Head from "next/head";
import { HiOutlineGlobeAsiaAustralia } from "react-icons/hi2";
import { HiOutlineLocationMarker } from "react-icons/hi";
import ProjectCard from "@/components/cards/project-card";
import api from "@/utils/api";

export default function UserId({ data, notFound }) {
	const user = data;
	const project = data.project;

	if (notFound) {
		return "not found";
	}

	return (
		<>
			<Head>
				<title>Profile - Mejeng</title>
				<meta name='description' content='Login page Mejeng App ' />
			</Head>

			<section className='flex items-start justify-center gap-20'>
				<div className='flex flex-1 flex-col items-end justify-center gap-6'>
					<img
						src={
							user?.profile_image?.includes("avatars")
								? user?.profile_image
								: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${user?.profile_image}`
						}
						height={150}
						width={150}
						alt='Profile'
						className='h-[150px] w-[150px] rounded-full bg-contain'
					/>
				</div>

				<div className='flex-1'>
					<h1 className='text-2xl font-semibold'>{user?.name}</h1>
					<div className='my-7 flex items-center justify-start gap-7'>
						<div className='flex items-center justify-start gap-1 text-primary'>
							<HiOutlineGlobeAsiaAustralia className='h-4 w-4' />
							<p className='text-lg font-medium'>
								{user?.country ? user?.country : "your country"}
							</p>
						</div>
						<div className='flex items-center justify-start gap-1 text-primary'>
							<HiOutlineLocationMarker className='h-4 w-4' />
							<p className='text-lg font-medium'>
								{user?.region ? user?.region : "your region"}
							</p>
						</div>
					</div>
					<p className='text whitespace-pre-line text-lg'>
						{user?.description
							? user?.description
							: "write your profile description here"}
					</p>
				</div>
			</section>
			<div className='my-16 h-[2px] bg-slate-100'></div>
			<section className='w-full'>
				<div className='grid grid-cols-4 gap-y-6'>
					{project.map((project) => {
						return (
							<div key={project.id} className='mx-auto'>
								<ProjectCard {...project} />
							</div>
						);
					})}
				</div>
			</section>
		</>
	);
}

export const getServerSideProps = async ({ query }) => {
	const { slug } = query;
	try {
		const response = await api.get("/api/user/other-profile", {
			headers: {
				"Content-Type": "application/json",
			},
			data: {
				slug,
			},
		});
		const data = response.data.data;
		return {
			props: {
				data,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};
