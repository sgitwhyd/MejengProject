'use-client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminAddFeature from './admin-add-feature';
import AdminBanWarning from './admin-ban-waring';
import AdminHome from './admin-home';
import AdminProfileCreator from './admin-profile-creator';
import { ImHome } from 'react-icons/im';
import { CgProfile } from 'react-icons/cg';
import { BiCategory } from 'react-icons/bi';
import { IoWarningOutline } from 'react-icons/io5';

import { useSelector, useDispatch } from 'react-redux';
import { selectAuth } from '@/store/auth/auth.selector';
import { selectAdmin } from '@/store/admin/admin.selector';
import { selectCategories } from '@/store/categories/categories.selector';
import { selectTools } from '@/store/tools/tools.selector';
import { fetchUsers } from '@/store/admin/admin.action';
import { fetchCategories } from '@/store/categories/categories.action';
import { fetchTools } from '@/store/tools/tools.action';
import { authLogout } from '@/store/auth/auth.reducer';

export default function Admin() {
	const dispatch = useDispatch();
	const router = useRouter();
	const [page, setPage] = useState('dashboard');

	const { token, user } = useSelector(selectAuth);

	const handlePage = (menu) => {
		setPage(menu);
	};

	useEffect(() => {
		dispatch(
			fetchUsers({
				token,
			})
		);
		dispatch(fetchCategories());
		dispatch(fetchTools());
	}, []);

	const handleLogout = () => {
		dispatch(authLogout());
		router.push('/auth/login');
	};

	const menuItems = [
		{
			label: 'Dashboard',
			value: 'dashboard',
			icons: <ImHome size={22} />,
		},
		{
			label: 'Profile Creator',
			value: 'profileCreator',
			icons: <CgProfile size={22} />,
		},
		{
			label: 'Add Feature',
			value: 'addfeature',
			icons: <BiCategory size={22} />,
		},
		{
			label: 'Ban or Warning',
			value: 'banWarning',
			icons: <IoWarningOutline size={22} />,
		},
	];

	return (
		<div className='bg-slate-100/80'>
			<Head>
				<title>Mejeng - Admin</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/mejeng-icon.ico' />
			</Head>

			<nav className='drawer-mobile drawer'>
				<input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
				<div className='drawer-content flex flex-col px-6 py-3'>
					<div className='flex items-center justify-between'>
						<div className='decoration-none breadcrumbs text-sm'>
							<ul>
								<li className='cursor-pointer text-gray-500 hover:text-blue-400'>
									<p className='no-underline'>Dashboard</p>
								</li>
								{menuItems.map((item) => {
									if (page === item.value && page !== 'dashboard') {
										return (
											<li key={item.value}>
												<span>{item.label}</span>
											</li>
										);
									}
									return null;
								})}
							</ul>
						</div>

						{/* User Menu */}
						<div className='dropdown-end dropdown'>
							<div
								tabIndex={0}
								className='avatar flex cursor-pointer items-center gap-2 py-2 px-3 hover:rounded-lg hover:bg-slate-200'>
								<div className='w-8 rounded-full'>
									<img src={user?.profile_image} />
								</div>
								<p className='font-semibold'>{user?.name}</p>
							</div>
							<ul
								tabIndex={0}
								className='dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow'>
								<li>
									<Link href='/' className='hover:text-black'>
										Homepage
									</Link>
								</li>
								<li>
									<button className='hover:text-black' onClick={handleLogout}>
										Logout
									</button>
								</li>
							</ul>
						</div>
					</div>
					{/* User Menu End */}

					{/* <!-- Page content Start --> */}
					{page === 'dashboard' && <AdminHome />}
					{page === 'profileCreator' && <AdminProfileCreator />}
					{page === 'addfeature' && <AdminAddFeature />}
					{page === 'banWarning' && <AdminBanWarning />}
					{/* <!-- Page content end --> */}
					<div className='absolute top-5 left-0'>
						<label
							htmlFor='my-drawer-2'
							className='btn-primary drawer-button btn lg:hidden'>
							Open drawer
						</label>
					</div>
				</div>
				<div className='drawer-side '>
					<label htmlFor='my-drawer-2' className='drawer-overlay'></label>
					<ul className='menu m-0 w-72 rounded-none bg-gradient-to-bl from-gray-800 to-gray-700 p-4 text-white lg:m-4 lg:rounded-2xl lg:p-2'>
						<div className='mb-8 flex items-center justify-center border-b-2 border-gray-600 py-8'>
							<h1 className='text-lg font-bold'>Admin Mejeng Dashboard</h1>
						</div>
						{/* <!-- Sidebar content start --> */}
						<div className='px-2'>
							{menuItems.map((item) => {
								return (
									<li key={item.value} className='flex justify-center pb-1'>
										<a
											onClick={() => handlePage(item.value)}
											className={
												page === item.value
													? 'flex bg-gradient-to-tr from-sky-600 to-sky-400 text-white hover:text-white'
													: 'from-sky-600 to-sky-400 hover:bg-gradient-to-tr hover:text-white'
											}>
											{item.icons}
											<span className='pl-3 text-lg'>{item.label}</span>
										</a>
									</li>
								);
							})}
						</div>
						{/* <!-- Sidebar content end --> */}
					</ul>
				</div>
			</nav>
		</div>
	);
}
