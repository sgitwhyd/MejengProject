import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import SuccessCreatorHero from '@/assets/images/success-creator.png';
import ErrorCreatorHero from '@/assets/images/error-creator.png';

import { activateCreator } from '@/store/auth/auth.action';
import { SuccessToast, ErrorToast } from '@/components/toast/alert-taost';

const index = () => {
	const router = useRouter();
	const dispatch = useDispatch();
  const { token } = router.query;


	const [error, setError] = useState('');

	const handleActivateCreator = async () => {
		await dispatch(activateCreator({ token })).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
        setError(res.payload.error.message)
			}
		});
	};

	useEffect(() => {
    if(token){
      handleActivateCreator()
    }
	}, [token])


	return (
		<div className='flex flex-col items-center'>
			<Image
				src={error ? ErrorCreatorHero : SuccessCreatorHero}
				width={200}
				height={200}
				alt='Succes'
			/>

			<h3 className='my-6 text-2xl font-bold'>
				{error ? 'Sorry' : 'Congratulations'}
			</h3>
			<p className='text-2xl font-medium text-gray-300'>
				{error
					? error
					: 'You are now a creator, you can create your own project'}
			</p>
			<button
				onClick={() => {
					error ? router.push('/') : router.push('/auth/login');
				}}
				className='no-animation btn mt-12 rounded-full border-none bg-primary px-8 py-2 text-lg font-semibold capitalize text-white hover:bg-primary/90'>
				Continue
			</button>
		</div>
	);
};

export default index;
