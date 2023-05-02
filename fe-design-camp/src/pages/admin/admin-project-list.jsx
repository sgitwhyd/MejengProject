import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";
import { AiOutlineLink } from "react-icons/ai";

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

	const tableHeader = [
		"Title Project",
		"Creator Name",
		"Categories",
		"Status",
		"Detail Project",
	];

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
				<table className='w-full text-left text-sm text-gray-500 '>
					<thead className='bg-gray-50 text-xs uppercase text-gray-700 '>
						<tr>
							{tableHeader.map((header, index) => {
								return (
									<th
										key={index}
										scope='col'
										className='whitespace-nowrap px-6 py-3'>
										{header}
									</th>
								);
							})}
						</tr>
					</thead>
					<tbody>
						{filteredData.map((post) => {
							return (
								<tr key={post.id} className='border-b bg-white'>
									<th
										scope='row'
										className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
										{post.title}
									</th>
									<td className='px-6 py-4'>{post.user.name}</td>
									<td className='px-6 py-4'>{post.categories.name}</td>
									<td className='px-6 py-4 font-semibold'>
										{post.is_active ? (
											<button className='btn-success btn-xs btn capitalize text-white'>
												Active
											</button>
										) : (
											<button className='btn-error btn-xs btn capitalize text-white'>
												Disable
											</button>
										)}
									</td>
									<td className='px-6 py-4'>
										<button
											onClick={() => {
												handleModal(post);
											}}
											className='rounded-md bg-[#38B9F3] px-2 py-1 capitalize text-white'>
											See Details
										</button>
									</td>
								</tr>
							);
						})}
						{filteredData.length === 0 && (
							<tr className='border-b bg-white'>
								<td colSpan='5' className='px-6 py-4 text-center'>
									No data found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/*<-- Modal -->*/}
			{isModalOpen && (
				<div className='absolute inset-0 z-[99] mx-auto my-auto h-[440px] w-[478px] rounded-2xl border bg-white p-6 shadow-lg drop-shadow-xl'>
					<div className='relative flex h-full w-full flex-col items-center justify-center'>
						<label
							className='btn-sm btn-circle btn absolute -right-2 -top-2'
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
									<button className='btn-success btn-sm btn capitalize text-white'>
										Active
									</button>
								) : (
									<button className='btn-error btn-sm btn capitalize text-white'>
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
