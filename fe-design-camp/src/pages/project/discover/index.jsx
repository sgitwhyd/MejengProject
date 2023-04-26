import { useState, useEffect } from "react";
import Head from "next/head";
import ProjectCard from "@/components/cards/project-card";
import { CiSearch } from "react-icons/ci";
import { TbFilter, TbFilterOff } from "react-icons/tb";
import Image from "next/image";
import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "@/store/projects/projects.action";
import { selectCategories } from "@/store/categories/categories.selector";
import { selectTools } from "@/store/tools/tools.selector";
import { selectProject } from "@/store/projects/projects.selector";

export default function Discover() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [isFilter, setIsFilter] = useState(false);
	const [error, setError] = useState(null);
	const [search, setSearch] = useState("");

	const { categories } = useSelector(selectCategories);
	const { tools } = useSelector(selectTools);
	const { projects, loading } = useSelector(selectProject);

	const handleFilterCategories = (e) => {
		const filterValue = e.target.value;
		if (filterValue !== "all") {
			router.query.category = filterValue;
			router.push(router);
		} else {
			router.push("/project/discover?category=all");
		}
	};

	const handleFilterTool = (e) => {
		const filterValue = e.target.value;
		if (filterValue !== "all") {
			router.query.tool = filterValue;
			router.push(router);
		} else {
			router.push("/project/discover?category=all");
		}
	};

	const filteredProjects = projects.filter((project) =>
		project.title.toLowerCase().includes(search.toLowerCase())
	);

	useEffect(() => {
		const getFilteredProject = async () => {
			await dispatch(
				getProjects({
					category:
						router.query.category === "all" ? null : router.query.category,
					tool: router.query.tool,
				})
			).then((res) => {
				if (res.meta.requestStatus === "rejected") {
					setError(res.payload.status);
					setSearch("");
				} else {
					setError(null);
					setSearch("");
				}
			});
		};

		getFilteredProject();
	}, [router.query]);

	useEffect(() => {
		router.push("/project/discover?category=all");
	}, []);

	const filterCategories = [
		{
			name: "All",
			slug: "all",
		},
		...categories,
	];

	return (
		<>
			<Head>
				<title>Discover - Mejeng</title>
				<meta
					name='description'
					content='Find best showcase project design here'
				/>
			</Head>
			<section className='flex flex-col items-center justify-center'>
				<h1 className='text-3xl font-bold text-primary'>
					Find inspiration from the{" "}
					<span className='text-secondary'>Design Category</span> for your
					project
				</h1>

				<div
					className={`mt-8 flex items-center justify-center gap-8 font-medium ${
						isFilter ? "" : "mb-20"
					}`}>
					{filterCategories.map((category, index) => {
						return (
							<button
								key={index}
								onClick={handleFilterCategories}
								value={category.slug}
								className={
									router.query.category === category.slug
										? "rounded-lg bg-primary/10 px-3 py-2 text-primary"
										: "rounded-lg px-3 py-2 text-black transition-all hover:bg-primary/10 hover:text-primary"
								}>
								{category.name}
							</button>
						);
					})}
					<button
						className={`tooltip tooltip-right rounded-lg border border-primary/60 p-2 text-primary/60 transition-all duration-300 hover:border-primary/0 hover:bg-primary/10 hover:text-primary ${
							isFilter && "border-primary/0 bg-primary/10 text-primary"
						}`}
						data-tip={isFilter ? "Remove Filters" : "Filters"}
						onClick={() => (isFilter ? setIsFilter(false) : setIsFilter(true))}>
						{isFilter ? (
							<TbFilterOff className='h-6 w-6' />
						) : (
							<TbFilter className='h-6 w-6' />
						)}
					</button>
				</div>

				{isFilter ? (
					<div className='mt-8 flex flex-col items-center justify-center gap-5'>
						<div className='flex flex-wrap gap-3'>
							{tools.map((tool) => (
								<label
									key={tool.id}
									className='flex w-max cursor-pointer items-center gap-3 rounded-xl border px-3 py-3'>
									<input
										type='checkbox'
										className='checkbox'
										value={tool.slug}
										name='ToolId'
										onChange={handleFilterTool}
										checked={router.query.tool?.includes(tool.slug)}
									/>
									<Image
										src={
											tool.icon.includes("loremflickr")
												? tool.icon
												: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${tool.icon}`
										}
										width={20}
										height={20}
										alt={tool.name}
									/>
									{tool.name}
								</label>
							))}
						</div>
						<div>
							<div className='relative mt-9 flex h-12 w-[500px] items-center justify-between rounded-full bg-[#F0F1F2] text-[#9F9F9F]'>
								<CiSearch size={25} className='absolute right-5' />
								<input
									type='text'
									placeholder='Search what your want here...'
									onChange={(e) => setSearch(e.target.value)}
									value={search}
									className='w-full bg-transparent text-center text-xs font-medium focus:outline-none'
								/>
							</div>
						</div>
					</div>
				) : null}

				{loading ? (
					"loading..."
				) : (
					<div className='mt-10 grid grid-cols-4 gap-8 text-black'>
						{filteredProjects.length === 0 || error ? (
							<h1 className='text-center text-2xl font-bold'>
								{search} Not Found
							</h1>
						) : (
							filteredProjects.map((post) => {
								return <ProjectCard key={post.id} {...post} />;
							})
						)}
					</div>
				)}
			</section>
		</>
	);
}
