import { useState, useMemo } from "react";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { AiOutlineLink } from "react-icons/ai";
import Table from "@/components/table";

import { useSelector } from "react-redux";
import { selectProject } from "@/store/projects/projects.selector";
import { selectCategories } from "@/store/categories/categories.selector";

export default function AdminProjectList() {
	const [filterCategory, setFilterCategory] = useState("All");
	const [searchText, setSearchText] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalData, setModalData] = useState({});

	const { projects } = useSelector(selectProject);
	const { categories } = useSelector(selectCategories);

	const handleModal = (data) => {
		setIsModalOpen(true);
		setModalData(data);
	};

	const handleFilterChange = (e) => {
		setFilterCategory(e.target.value);
	};

	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};

	const filteredData = projects.filter((project) => {
		return (
			(filterCategory === "" ||
				filterCategory === "All" ||
				project.categories.name === filterCategory) &&
			project?.title.toLowerCase().includes(searchText.toLowerCase())
		);
	});

	const TABLE_HEADER = useMemo(
		() => [
			{
				Header: "Title Project",
				accessor: "title",
			},
			{
				Header: "Creator Name",
				accessor: "creator",
			},
			{
				Header: "Category",
				accessor: "category",
			},
			{
				Header: "Status",
				accessor: "status",
			},
			{
				Header: "Detail Project",
				accessor: "detail",
			},
		],
		[]
	);

	const TABLE_DATA = useMemo(
		() => [
			...filteredData.map((project) => ({
				title: project.title,
				creator: project.user.name,
				category: project.categories.name,
				status: project.is_active ? (
					<button className='btn btn-success btn-xs capitalize text-white'>
						Active
					</button>
				) : (
					<button className='btn btn-error btn-xs capitalize text-white'>
						Disable
					</button>
				),
				detail: (
					<button
						onClick={() => {
							handleModal(project);
						}}
						className='rounded-md bg-[#38B9F3] px-2 py-1 capitalize text-white'>
						See Details
					</button>
				),
			})),
		],
		[filteredData]
	);

	return (
		<section className='relative h-full'>
			<header className='text-xl font-bold'>Project List </header>
			<div
				className={`mt-6 mb-2 flex items-center justify-end gap-2 ${
					isModalOpen && "blur-sm"
				}`}>
				{/*<-- Filter Categories -->*/}
				<select
					className='select-bordered select select-sm w-full max-w-xs'
					value={filterCategory}
					onChange={handleFilterChange}>
					<option value=''>All</option>
					{categories.map((category) => {
						return (
							<option key={category.id} value={category.name}>
								{category.name}
							</option>
						);
					})}
				</select>
				{/*<-- Searchbar -->*/}
				<div className='relative w-full max-w-xs'>
					<input
						type='text'
						placeholder='Search Project by Title'
						className='input-bordered input input-sm w-full'
						value={searchText}
						onChange={handleSearch}
					/>
					<div className='absolute top-0 right-0 mt-2 mr-2'>
						<BsSearch className='text-gray-400' />
					</div>
				</div>
			</div>
			<div
				className={`relative mt-5 overflow-x-auto shadow-md sm:rounded-lg ${
					isModalOpen && "blur-sm"
				}`}>
				<Table columns={TABLE_HEADER} data={TABLE_DATA} numberToShow={6} />
			</div>

			{/*<-- Modal -->*/}
			{isModalOpen && (
				<div className='absolute inset-0 z-[99] mx-auto my-auto h-[440px] w-[478px] rounded-2xl border bg-white p-6 shadow-lg drop-shadow-xl'>
					<div className='relative flex h-full w-full flex-col items-center justify-center'>
						<label
							className='btn btn-sm btn-circle absolute -right-2 -top-2'
							onClick={() => {
								setIsModalOpen(false);
							}}>
							✕
						</label>
						<h3 className='text-lg font-bold'>Details of the project</h3>
						{/* Parsing value data */}
						<div className='mb-2 w-full'>
							<label className='label'>
								<span className='label-text'>Project Name</span>
							</label>
							<input
								type='text'
								className='input-bordered input w-full'
								disabled
								value={modalData.title}
								onChange={() => {}}
							/>
						</div>
						<div className='mb-2 w-full'>
							<label className='label'>
								<span className='label-text'>Creator Name</span>
							</label>
							<input
								type='text'
								className='input-bordered input w-full'
								disabled
								value={modalData.user.name}
								onChange={() => {}}
							/>
						</div>
						<div className='mb-2 w-full'>
							<label className='label'>
								<span className='label-text'>Category Design</span>
							</label>
							<input
								type='text'
								className='input-bordered input w-full'
								disabled
								value={modalData.categories.name}
								onChange={() => {}}
							/>
						</div>
						<div className='flex w-full items-center justify-between'>
							<div className='w-1/3'>
								<label className='label'>
									<span className='label-text'>Status Project</span>
								</label>
								{modalData.is_active ? (
									<button className='btn btn-success btn-sm capitalize text-white'>
										Active
									</button>
								) : (
									<button className='btn btn-error btn-sm capitalize text-white'>
										Disable
									</button>
								)}
							</div>
							<div className='w-2/3'>
								<label className='label'>
									<span className='label-text'>URL Post</span>
								</label>
								<Link
									href={`/project/detail-project/${modalData.slug}`}
									target='_blank'
									rel='noopener noreferrer'
									className='flex items-center justify-center gap-2 rounded-md bg-primary p-1 text-white hover:text-white'>
									<AiOutlineLink size={15} />
									Go to this project details page
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
