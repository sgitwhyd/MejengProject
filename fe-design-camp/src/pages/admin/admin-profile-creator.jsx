import React, { useState, useEffect, useMemo } from "react";
import { BsSearch } from "react-icons/bs";
import { MdReportProblem } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { selectAdmin } from "@/store/admin/admin.selector";
import { bannUser } from "@/store/admin/admin.action";
import { fetchUsers } from "@/store/admin/admin.action";
import { SuccessToast, ErrorToast } from "@/components/toast/alert-taost";
import Table from "@/components/table";

export default function AdminProfileCreator() {
	const dispatch = useDispatch();

	const [searchText, setSearchText] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalData, setModalData] = useState({});

	const { users, ammount_users, loading } = useSelector(selectAdmin);

	const tableHeader = [
		"Creator Name",
		"Region & Country",
		"Post Project",
		"Total View",
		"Total Like",
		"Status",
		"Total Report",
		"Action",
	];

	const handleBanUser = async (id) => {
		await dispatch(
			bannUser({
				id,
			})
		).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
		});
		dispatch(fetchUsers());
		setIsModalOpen(false);
	};

	const handleModal = (data) => {
		setIsModalOpen(true);
		setModalData(data);
	};

	const handleSearch = (e) => {
		setSearchText(e.target.value);
	};

	const filteredData = users.filter((user) =>
		user.name.toLowerCase().includes(searchText.toLowerCase())
	);

	const TABLE_HEADER = useMemo(
		() => [
			{
				Header: "No",
				accessor: "no",
			},
			{
				Header: "Creator Name",
				accessor: "name",
			},
			{
				Header: "Region & Country",
				accessor: "region",
			},
			{
				Header: "Post Project",
				accessor: "post_project",
			},
			{
				Header: "Total View",
				accessor: "total_view",
			},
			{
				Header: "Total Like",
				accessor: "total_like",
			},
			{
				Header: "Status",
				accessor: "status",
			},
			{
				Header: "Total Report",
				accessor: "total_report",
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
			...filteredData.map((user, index) => ({
				no: index + 1,
				name: user.name,
				region: `${user.region} - ${user.country}`,
				post_project: user.total_project,
				total_view: user.total_views_project,
				total_like: user.total_project_like,
				status: user.is_active ? (
					<button className='btn btn-success btn-xs capitalize text-white'>
						Active
					</button>
				) : (
					<button className='btn btn-error btn-xs capitalize text-white'>
						Disable
					</button>
				),
				total_report: user.total_project_report,
				action: (
					<button
						className={`btn btn-error btn-sm gap-2 capitalize text-white ${
							user.is_active ? "" : "btn-disabled"
						}`}
						onClick={() => handleModal(user)}>
						<MdReportProblem />
						Ban Creator
					</button>
				),
			})),
		],
		[filteredData]
	);

	return (
		<section className='relative h-full'>
			<header className='text-xl font-bold'>Profile Creator</header>
			<div
				className={`mt-6 mb-2 flex items-center justify-end ${
					isModalOpen && "blur-sm"
				}`}>
				<div className='relative w-full max-w-xs'>
					<input
						type='text'
						placeholder='Search creator name'
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
				className={`relative overflow-x-auto shadow-md sm:rounded-lg ${
					isModalOpen && "blur-sm"
				}`}>
				<Table columns={TABLE_HEADER} data={TABLE_DATA} numberToShow={6} />
			</div>
			{isModalOpen && (
				<div className='absolute inset-0 z-[99] mx-auto my-auto  h-fit w-[478px] rounded-2xl border  bg-white py-14 shadow-lg drop-shadow-xl'>
					<div className='relative flex h-full w-full flex-col items-center justify-center'>
						<h1 className='text-lg font-bold'>
							Are you sure to ban this creator?
						</h1>
						<p>Creator Name : {modalData.name}</p>
						<div className='mt-5 flex gap-4'>
							<button
								className='btn btn-error btn-sm text-white'
								onClick={() => setIsModalOpen(false)}>
								Cancel
							</button>
							<button
								className={`btn btn-success btn-sm text-white ${
									loading ? "loading" : ""
								}`}
								onClick={() => {
									handleBanUser(modalData.id);
								}}>
								Yes
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
