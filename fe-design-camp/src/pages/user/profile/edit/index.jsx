import Link from 'next/link';
import Head from 'next/head';
import Button from '@/components/button/button';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/store/auth/auth.selector';

export default function index() {
	const { user } = useSelector(selectAuth);

	return (
		<>
			<Head>
				<title>Edit Profile - Mejeng</title>
				<meta name='description' content='Login page Mejeng App ' />
			</Head>
			<section className='flex flex-col items-center justify-center gap-16'>
				<div className='grid grid-cols-3 gap-24'>
					<div>
						<h3>Username</h3>
						<input
							type='email'
							placeholder=''
							value={user.name}
							className='w-64 border-b-2 border-[#9F9F9F] py-2 focus:outline-none '
						/>
					</div>
					<div>
						<h3>Region</h3>
						<input
							type='email'
							placeholder=''
							value={user.region}
							className='w-64 border-b-2 border-[#9F9F9F] py-2 focus:outline-none '
						/>
					</div>
					<div>
						<h3>Country</h3>
						<select
							className='select-bordered select w-64 max-w-xs'
							defaultValue=''>
							<option value='' disabled>
								Select language
							</option>
							<option value='indonesia'>Indonesia</option>
						</select>
					</div>
				</div>

				<div className='grid grid-cols-3 gap-24'>
					<div className='col-span-2'>
						<h3>Profile Description</h3>
						<textarea
							placeholder='write your profile description here'
							className='col-span-2 h-32 w-full border-b-2 border-[#9F9F9F] py-2 focus:outline-none'></textarea>
					</div>
					<div>
						{user.profile_image && (
							<img src={user.profile_image} alt='profile image' />
						)}
						<h3>Profile Picture</h3>
						<input
							type='file'
							placeholder=''
							className='w-64 border-b-2 border-[#9F9F9F] py-2 focus:outline-none '
						/>
					</div>
				</div>

				<div className='mt-7 flex items-center justify-center gap-5'>
					<Link
						href='/user/profile'
						className='w-[215px] rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80 hover:text-white'>
						Cancel
					</Link>
					<Link
						href='/user/profile'
						className='w-[215px] rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80 hover:text-white'>
						Save Changes
					</Link>
				</div>
			</section>
		</>
	);
}
