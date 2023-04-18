import React from 'react';
import { MdPostAdd } from 'react-icons/md';
import { FaUserFriends, FaUserCheck } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { selectAdmin } from '@/store/admin/admin.selector';

export default function AdminHome() {
	const { ammount_users, ammount_active_user, ammount_creator_user } =
		useSelector(selectAdmin);

	const datas = [
		{
			name: 'All Post',
			icon: <MdPostAdd size={40} />,
			total: ammount_users,
			bg: 'from-blue-600 to-blue-400',
		},
		{
			name: 'Active User',
			icon: <FaUserFriends size={40} />,
			total: ammount_active_user,
			bg: 'from-pink-600 to-pink-400',
		},
		{
			name: 'Total Creator',
			icon: <FaUserCheck size={40} />,
			total: ammount_creator_user,
			bg: 'from-green-600 to-green-400',
		},
	];

	return (
		<>
			<header className='text-xl font-bold'>Home</header>
			<section className='mt-10 grid  grid-cols-4 gap-10'>
				{datas.map((data, index) => (
					<div
						key={index}
						className='flex cursor-pointer items-center justify-center gap-5 rounded-2xl bg-white p-6 shadow-md'>
						<div
							className={`rounded-2xl bg-gradient-to-tr  p-6 text-white shadow-lg shadow-blue-500/40 ${data.bg}`}>
							{data.icon}
						</div>
						<div className='flex h-full flex-col justify-evenly'>
							<h2 className='text-lg font-semibold text-black/60'>
								{data.name}
							</h2>
							<p className='text-2xl font-extrabold'>{data.total}</p>
						</div>
					</div>
				))}
			</section>
		</>
	);
}
