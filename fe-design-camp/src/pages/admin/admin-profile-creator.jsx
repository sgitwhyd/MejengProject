import React, { useState, useEffect } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdReportProblem } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { selectAdmin } from '@/store/admin/admin.selector';
import { bannUser } from '@/store/admin/admin.action';
import { SuccessToast, ErrorToast } from '@/components/toast/alert-taost';

export default function AdminProfileCreator() {
	const dispatch = useDispatch();

	const [searchText, setSearchText] = useState('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalData, setModalData] = useState({});

	const { users, ammount_users, loading } = useSelector(selectAdmin);

	const tableHeader = [
		'Creator Name',
		'Region & Country',
		'Post Project',
		'Total View',
		'Total Like',
		'Status',
		'Total Report',
		'Action',
	];

	const handleBanUser = async (id) => {
		await dispatch(
			bannUser({
				id,
			})
		).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
		});
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

	return (
		<section className='relative h-full'>
			<header className='text-xl font-bold'>Profile Creator</header>
			<div
				className={`mt-6 mb-2 flex items-center justify-end ${
					isModalOpen && 'blur-sm'
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
					isModalOpen && 'blur-sm'
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
						{filteredData.map((user) => {
							return (
								<tr key={user.id} className='border-b bg-white'>
									<th
										scope='row'
										className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
										{user.name}
									</th>
									<td className='px-6 py-4'>
										{user.region} - {user.country}
									</td>
									<td className='px-6 py-4'>{user.total_project}</td>
									<td className='px-6 py-4'>{user.total_views_project}</td>
									<td className='px-6 py-4'>{user.total_project_like}</td>
									<td className='px-6 py-4'>
										{user.is_active ? (
											<button className='btn-success btn-xs btn capitalize text-white'>
												Active
											</button>
										) : (
											<button className='btn-error btn-xs btn capitalize text-white'>
												Disable
											</button>
										)}
									</td>
									<td className='px-6 py-4'>{user.total_project_report}</td>
									<td className='px-6 py-4'>
										<button
											className={`btn-error btn-sm btn gap-2 capitalize text-white ${
												user.is_active ? '' : 'btn-disabled'
											}`}
											onClick={() => handleModal(user)}>
											<MdReportProblem />
											Ban Creator
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
			{isModalOpen && (
				<div className='absolute inset-0 z-[99] mx-auto my-auto  h-fit w-[478px] rounded-2xl border  bg-white py-14 shadow-lg drop-shadow-xl'>
					<div className='relative flex h-full w-full flex-col items-center justify-center'>
						<h1 className='text-lg font-bold'>
							Are you sure to ban this creator?
						</h1>
						<p>Creator Name : {modalData.name}</p>
						<div className='mt-5 flex gap-4'>
							<button
								className='btn-error btn-sm btn text-white'
								onClick={() => setIsModalOpen(false)}>
								Cancel
							</button>
							<button
								className={`btn-success btn-sm btn text-white ${
									loading ? 'loading' : ''
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
