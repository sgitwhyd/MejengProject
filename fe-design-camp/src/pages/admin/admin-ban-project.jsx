import React, { useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaExclamationTriangle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectAdmin } from "@/store/admin/admin.selector";
import { bannProject } from "@/store/admin/admin.action";
import { fetchReportedProjects } from "@/store/admin/admin.action";

import { SuccessToast, ErrorToast } from "@/components/toast/alert-taost";
import Table from "@/components/table";
import { selectReportCategories } from "@/store/report/report.selector";

export default function AdminBanProject() {
	const dispatch = useDispatch();
	const [isModalBanOpen, setIsModalBanOpen] = useState(false);
	const [isModalDetailReportOpen, setIsModalDetailReportOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [modalData, setModalData] = useState({});

	const { reportedProjects, loading } = useSelector(selectAdmin);
	const { reportCategories } = useSelector(selectReportCategories);

	const handleBanProject = async (id) => {
		await dispatch(bannProject(id)).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.message);
			}
			dispatch(fetchReportedProjects());
		});
		setIsModalBanOpen(false);
	};

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const handleModal = (data) => {
		setIsModalBanOpen(true);
		setModalData(data);
	};

	const filteredData = reportedProjects.filter((data) => {
		return data.title.toLowerCase().includes(search.toLowerCase());
	});

	const TABLE_HEADER = useMemo(
		() => [
			{
				Header: "No",
				accessor: "no",
			},
			{
				Header: "Title",
				accessor: "title",
			},
			{
				Header: "Creator Name",
				accessor: "creator",
			},
			{
				Header: "Report Reason",
				accessor: "reportReason",
			},
			{
				Header: "Action",
				accessor: "action",
			},
		],
		[]
	);

	const TABLE_DATA = useMemo(
		() => [
			...filteredData.map((data, index) => ({
				no: index + 1,
				title: data.title,
				creator: data.user.name,
				reportReason: (
					<div className='indicator'>
						<span className='badge-primary badge indicator-item'>
							{data.projectReportCategories.length > 100 ? (
								<span className='text-white'>100+</span>
							) : (
								data.projectReportCategories.length
							)}
						</span>
						<div
							className='btn-warning btn-sm btn capitalize text-white'
							onClick={() => {
								setIsModalDetailReportOpen(!isModalDetailReportOpen);
								setModalData(data);
							}}>
							See Detail
						</div>
					</div>
				),
				action: (
					<button
						className={`btn-sm btn gap-2 capitalize text-white ${
							data.is_active ? "btn-error " : "btn-disabled bg-black"
						}`}
						onClick={() => {
							handleModal(data);
						}}>
						<FaExclamationTriangle />
						{data.is_active ? "Ban Project" : "Banned"}
					</button>
				),
			})),
		],
		[filteredData]
	);

	return (
		<div>
			<header className='text-xl font-bold'>Reported Project</header>
			<div
				className={`relative mt-[55px] overflow-x-auto sm:rounded-lg ${
					isModalBanOpen && "blur-sm"
				}`}>
				<div className='relative float-right w-full max-w-xs'>
					<input
						type='text'
						placeholder='Search Project by Title'
						className='input-bordered input input-sm w-full focus:outline-none'
						value={search}
						onChange={handleSearch}
					/>
					<div className='absolute top-0 right-0 mt-2 mr-2'>
						<BsSearch className='text-gray-400' />
					</div>
				</div>
				<div className='mt-14 shadow-sm '>
					<Table columns={TABLE_HEADER} data={TABLE_DATA} numberToShow={6} />
				</div>
			</div>
			{isModalBanOpen && (
				<div className='absolute inset-0 z-[99] mx-auto my-auto  h-fit w-[478px] rounded-2xl border  bg-white p-10 shadow-lg drop-shadow-xl'>
					<div className='relative flex h-full w-full flex-col items-center justify-center'>
						<h1 className='text-center text-lg font-bold'>
							Are you sure to banned this <br />
							<strong>{modalData.title}</strong> project ?
						</h1>
						<p className='my-5'>Creator Name : {modalData.user.name}</p>
						<div className='mt-3 flex gap-4'>
							<button
								className='btn-error btn-sm btn text-white'
								onClick={() => setIsModalBanOpen(false)}>
								Cancel
							</button>
							<button
								className={`btn-success btn-sm btn text-white ${
									loading ? "loading" : ""
								}`}
								onClick={() => {
									handleBanProject({
										id: modalData.id,
									});
								}}>
								Yes
							</button>
						</div>
					</div>
				</div>
			)}
			{isModalDetailReportOpen && (
				<div className='absolute inset-0 z-[99] mx-auto my-auto  h-fit w-[478px] rounded-2xl border  bg-white p-10 shadow-lg drop-shadow-xl'>
					<div className='relative flex h-full w-full flex-col items-center justify-center'>
						<h1 className='text-center text-lg font-bold'>Detail</h1>
						<div className='my-5 w-full'>
							<table className='w-full'>
								<thead>
									<tr>
										<th>Kategori</th>
										<th>Jumlah Report</th>
									</tr>
								</thead>
								<tbody className='text-center'>
									{reportCategories
										.filter((category) =>
											modalData.projectReportCategories.some(
												(report) => report.name === category.name
											)
										)
										.map((category) => (
											<tr key={category.id}>
												<td>{category.name}</td>
												<td>
													{
														modalData.projectReportCategories.filter(
															(report) => report.name === category.name
														).length
													}
												</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
						<div className='mt-3 flex gap-4'>
							<button
								className='btn-error btn-sm btn text-white'
								onClick={() =>
									setIsModalDetailReportOpen(!isModalDetailReportOpen)
								}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
