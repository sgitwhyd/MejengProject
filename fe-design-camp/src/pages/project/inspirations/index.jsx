import Head from "next/head";
import ProjectCard from "@/components/cards/project-card";
import LayoutHomeSection from "@/components/layouts/layout-home-section";
import LayoutHomeSectionReverse from "@/components/layouts/layout-home-section-reverse";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getInspirationProjects } from "@/store/projects/projects.action";
import { selectProject } from "@/store/projects/projects.selector";

export default function Home() {
	const dispatch = useDispatch();
	const [datas, setDatas] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			await dispatch(
				getInspirationProjects({
					category: null,
					tool: null,
				})
			).then((res) => {
				setDatas(
					res.payload.data.map((item) => ({
						seeMoreRoute: `/project/discover?category=${item.slug}`,
						...item,
						project: item.project.slice(0, 3),
					}))
				);
			});
		};

		fetchData();
	}, []);

	return (
		<>
			<Head>
				<title>Inspiration - Mejeng</title>
				<meta
					name='description'
					content='Find best showcase project design here'
				/>
			</Head>

			<section className='flex flex-col items-center justify-center pb-20'>
				<h1 className='pb-3 text-5xl font-extrabold text-primary'>
					Find Creative Inspiration
				</h1>
				<h3 className='text-2xl font-semibold text-secondary'>
					Your Brilliant Design Ideas
				</h3>
			</section>
			<div className='flex flex-col gap-16'>
				{datas.map((data, index) => {
					if ((index + 1) % 2 === 0) {
						return (
							<LayoutHomeSectionReverse
								key={data.id}
								categoryTitle={data?.name}
								categoryDesc={data?.desc}
								seeMoreRoute={data?.seeMoreRoute}>
								{data?.project?.map((item) => (
									<ProjectCard key={item.id} {...item} />
								))}
							</LayoutHomeSectionReverse>
						);
					} else {
						return (
							<LayoutHomeSection
								key={data.id}
								categoryTitle={data?.name}
								categoryDesc={data?.desc}
								seeMoreRoute={data?.seeMoreRoute}>
								{data?.project?.map((item) => {
									return <ProjectCard key={item.id} {...item} />;
								})}
							</LayoutHomeSection>
						);
					}
				})}
			</div>
		</>
	);
}
