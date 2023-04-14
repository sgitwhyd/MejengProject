import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { RiUserSettingsLine } from 'react-icons/ri';
import { HiOutlineGlobeAsiaAustralia } from 'react-icons/hi2';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import ButtonWIcon from '@/components/button/button-w-icon';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/store/auth/auth.selector';

export default function Profile() {
	const { user } = useSelector(selectAuth);

	return (
		<>
			<Head>
				<title>Profile - Mejeng</title>
				<meta name='description' content='Login page Mejeng App ' />
			</Head>

			<section className='flex items-start justify-center gap-20 border-b-2 pb-16'>
				<div className='flex flex-1 flex-col items-end justify-center gap-6'>
					<Image
						src={user.profile_image}
						height={150}
						width={150}
						alt='Profile'
						className='h-[150px] w-[150px] rounded-full'
					/>
					<ButtonWIcon
						route='/user/profile/edit'
						icon={<RiUserSettingsLine className='h-6 w-6' />}
						name='Edit Profile'
					/>
				</div>

				<div className='flex-1'>
					<h1 className='text-2xl font-semibold'>{user.name}</h1>
					<div className='my-7 flex items-center justify-start gap-7'>
						<div className='flex items-center justify-start gap-1 text-primary'>
							<HiOutlineGlobeAsiaAustralia className='h-4 w-4' />
							<p className='text-lg font-medium'>
								{user.country ? user.country : 'your country'}
							</p>
						</div>
						<div className='flex items-center justify-start gap-1 text-primary'>
							<HiOutlineLocationMarker className='h-4 w-4' />
							<p className='text-lg font-medium'>
								{user.region ? user.region : 'your region'}
							</p>
						</div>
					</div>
					<p className='text whitespace-pre-line text-lg'>
						{user.desc ? user.desc : 'write your profile description here'}
					</p>
				</div>

				<div className='flex-1'>
					<ButtonWIcon
						route='/user/upload-project'
						icon={<FiPlus className='h-6 w-6' />}
						name='Create new post'
					/>
				</div>
			</section>
		</>
	);
}
