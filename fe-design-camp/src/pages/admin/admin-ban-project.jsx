import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function AdminBanProject() {
	let ammountInappropriate = 0;
	let ammountSensitive = 0;
	let ammountPlagiarism = 0;
	const [isModalBanOpen, setIsModalBanOpen] = useState(false);
	const [isModalDetailReportOpen, setIsModalDetailReportOpen] = useState(false);
	const [search, setSearch] = useState('');
	const [modalData, setModalData] = useState({});

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const handleModal = (data) => {
		setIsModalBanOpen(true);
		setModalData(data);
	};

	const tableHeader = [
		'No',
		'Title',
		'Creator Name',
		'Report Reason',
		'Action',
	];

	const datas = [
		{
			id: 1,
			title: 'Design Logo',
			is_active: true,
			user: {
				name: 'Ahmad Gito',
			},
			projectReportCategories: [
				{
					name: 'Sensitive',
				},
				{
					name: 'Inappropriate',
				},
				{
					name: 'Plagiarsm',
				},
				{
					body: 'Plagiat Cok',
				},
			],
		},
		{
			id: 2,
			title: 'Design Logo 2',
			is_active: false,
			user: {
				name: 'Ahmad Gito 2',
			},
			projectReportCategories: [
				{
					name: 'Sensitive',
				},
			],
		},
	];

	const filteredData = datas.filter((data) => {
		return data.title.toLowerCase().includes(search.toLowerCase());
	});

	return (
		<div>
			<header className='text-xl font-bold'>Banned Project</header>
			<div
				className={`relative mt-[55px] overflow-x-auto sm:rounded-lg ${
					isModalBanOpen && 'blur-sm'
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
					<table className='w-full text-left text-sm  text-gray-500 '>
						<thead className='bg-gray-50 text-xs uppercase text-gray-700 '>
							<tr>
								{tableHeader.map((header) => {
									return (
										<th
											key={header}
											scope='col'
											className='whitespace-nowrap px-6 py-3'>
											{header}
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody>
							{filteredData.length === 0 ? (
								<tr className='border-b bg-white'>
									<td colSpan='5' className='px-6 py-4 text-center'>
										No data found
									</td>
								</tr>
							) : (
								filteredData.map((data, index) => {
									return (
										<tr key={data.id} className='border-b bg-white'>
											<th
												scope='row'
												className='whitespace-nowrap px-6 py-4 font-medium text-gray-900'>
												{index + 1}
											</th>
											<td className='px-6 py-4'>{data.title}</td>
											<td className='px-6 py-4'>{data.user.name}</td>
											<td className='px-6 py-4'>
												<div
													className='btn-warning btn-sm btn capitalize text-white'
													onClick={() => {
														setIsModalDetailReportOpen(
															!isModalDetailReportOpen
														);
														setModalData(data);
													}}>
													See Detail
												</div>
											</td>
											<td className='px-6 py-4'>
												<button
													className={`btn-sm btn gap-2 capitalize text-white ${
														data.is_active
															? 'btn-error '
															: 'btn-disabled bg-black'
													}`}
													onClick={() => handleModal(data)}>
													<FaExclamationTriangle />
													{data.is_active ? 'Ban Project' : 'Banned'}
												</button>
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
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
							<button className='btn-success btn-sm btn text-white'>Yes</button>
						</div>
					</div>
				</div>
			)}
			{isModalDetailReportOpen && (
				<div className='absolute inset-0 z-[99] mx-auto my-auto  h-fit w-[478px] rounded-2xl border  bg-white p-10 shadow-lg drop-shadow-xl'>
					<div className='relative flex h-full w-full flex-col items-center justify-center'>
						<h1 className='text-center text-lg font-bold'>Detail</h1>
						<p className='my-5 w-full'>
							{modalData.projectReportCategories.map((report) => {
								if (report.name === 'Inappropriate') {
									ammountInappropriate += 1;
								} else if (report.name === 'Plagiarsm') {
									ammountPlagiarism += 1;
								} else if (report.name === 'Sensitive') {
									ammountSensitive += 1;
								}
							})}
							<table className='w-full'>
								<tr>
									<td>Kategori</td>
									<td>Jumlah Report</td>
								</tr>
								<tr>
									<td>Inappropriate</td>
									<td>{ammountInappropriate}</td>
								</tr>
								<tr>
									<td>Plagiarism</td>
									<td>{ammountPlagiarism}</td>
								</tr>
								<tr>
									<td>Sensitive</td>
									<td>{ammountSensitive}</td>
								</tr>
							</table>
							<h4 className='my-5 text-center'>
								Others{' '}
								{modalData.projectReportCategories.length -
									(ammountInappropriate + ammountPlagiarism + ammountSensitive)}
							</h4>
							<div
								className={`h-[300px] overflow-y-auto ${
									modalData.projectReportCategories.length -
										(ammountInappropriate +
											ammountPlagiarism +
											ammountSensitive) <
									10
										? 'h-fit'
										: 'h-[200px]'
								}`}>
								{modalData.projectReportCategories.map((report, index) => (
									<ol type='1' key={index}>
										{report.body && <li>{report.body}</li>}
									</ol>
								))}
							</div>
						</p>
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
