import Link from 'next/link';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/store/user/user.selector';
import { updateProfile } from '@/store/user/user.action';
import { useState } from 'react';
import { SuccessToast, ErrorToast } from '@/components/toast/alert-taost';
import { useRouter } from 'next/router';

export default function index() {
	const dispatch = useDispatch();
	const router = useRouter();
	const { user } = useSelector(selectUser);

	const [updateProfilePayload, setUpdateProfilePayload] = useState({
		name: user?.name,
		region: user?.region,
		country: user?.country,
		desc: user?.description,
		user_image: {},
	});

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setUpdateProfilePayload({
			...updateProfilePayload,
			[name]: value,
		});
	};

	const handleUploadImage = (e) => {
		const file = e.target.files[0];
		setUpdateProfilePayload({
			...updateProfilePayload,
			user_image: file,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(updateProfile(updateProfilePayload)).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				SuccessToast('Profile updated successfully');
				router.push('/user/profile');
			} else {
				ErrorToast('Failed to update profile');
			}
		});
	};

	return (
		<>
			<Head>
				<title>Edit Profile - Mejeng</title>
				<meta name='description' content='Login page Mejeng App ' />
			</Head>
			<form onSubmit={handleSubmit}>
				<section className='flex flex-col items-center justify-center gap-16'>
					<div className='grid grid-cols-3 gap-24'>
						<div>
							<h3>Name</h3>
							<input
								type='text'
								placeholder=''
								name='name'
								onChange={handleOnChange}
								value={updateProfilePayload?.name}
								className='w-64 border-b-2 border-[#9F9F9F] py-2 focus:outline-none '
							/>
						</div>
						<div>
							<h3>Region</h3>
							<input
								type='text'
								placeholder=''
								name='region'
								onChange={handleOnChange}
								value={updateProfilePayload?.region}
								className='w-64 border-b-2 border-[#9F9F9F] py-2 focus:outline-none '
							/>
						</div>
						<div>
							<h3>Country</h3>
							<select
								className='select-bordered select w-64 max-w-xs'
								defaultValue=''
								name='country'
								onChange={handleOnChange}>
								{user?.country ? (
									<option value={user?.country} selected>
										{user?.country}
									</option>
								) : (
									<>
										<option value='' disabled>
											Select language
										</option>
										<option value='indonesia'>Indonesia</option>
									</>
								)}
							</select>
						</div>
					</div>

					<div className='grid grid-cols-3 gap-24'>
						<div className='col-span-2'>
							<h3>Profile Description</h3>
							<textarea
								name='desc'
								onChange={handleOnChange}
								placeholder='write your profile description here'
								value={updateProfilePayload?.description}
								className='col-span-2 h-32 w-full border-b-2 border-[#9F9F9F] py-2 focus:outline-none'>
								{user.description}
							</textarea>
						</div>
						<div>
							<h3>Profile Picture</h3>
							<div className='mt-3 mb-2 w-[225px] '>
								{user.profile_image && (
									<img
										src={
											user.profile_image?.includes('avatars')
												? user.profile_image
												: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${user.profile_image}`
										}
										alt='profile image'
										className='rounded-xl'
									/>
								)}
							</div>

							<input
								type='file'
								placeholder=''
								name='user_image'
								onChange={handleUploadImage}
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
						<button
							type='submit'
							className='w-[215px] rounded-xl bg-primary px-4 py-3 text-center text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80 hover:text-white'>
							Save Changes
						</button>
					</div>
				</section>
			</form>
		</>
	);
}
