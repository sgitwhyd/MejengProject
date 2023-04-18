import Head from 'next/head';
import { BiArrowBack } from 'react-icons/bi';
import Image from 'next/image';
import forgotPasswordHero from '@/assets/auth/forgot-password-hero.png';
import MejengLogo from '@/assets/mejeng-logo-white.svg';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '@/store/auth/auth.action';
import { SuccessToast, ErrorToast } from '@/components/toast/alert-taost';
import { selectAuth } from '@/store/auth/auth.selector';

export default function ForgotPassword() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');

	const { loading } = useSelector(selectAuth);

	const handleOnChange = (e) => {
		setEmail(e.target.value);
	};

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		await dispatch(forgotPassword({ email })).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				SuccessToast('Check your email for reset password link');
			} else {
				ErrorToast(res.payload.message);
			}

			setEmail('');
		});
	};

	return (
		<>
			<Head>
				<title>Forgot Password - Mejeng</title>
				<meta name='description' content='Forgot account password Mejeng' />
			</Head>

			<div className='grid h-screen items-center justify-center md:grid-cols-2 '>
				<div className='relative hidden h-screen lg:block'>
					<Link
						href='/auth/login'
						className='tooltip tooltip-right absolute top-5 left-5 z-50 rounded-full bg-white p-2 text-black '
						data-tip='Back to Login Page'>
						<BiArrowBack className='h-6 w-6' />
					</Link>
					<Image
						src={forgotPasswordHero}
						alt='forgot password hero'
						fill
						className='bg-cover'
					/>

					<div className='absolute top-0 left-0 h-full w-full bg-black bg-opacity-50'></div>

					<div className='absolute top-0 left-0 flex h-full w-full items-center justify-center'>
						<div className='mx-auto w-1/2'>
							<h1 className='mb-2 text-center text-3xl font-bold text-white'>
								Fix your problem in
							</h1>
							<div className='relative mx-auto h-28 w-80'>
								<Image src={MejengLogo} alt='Mejeng Logo' fill />
							</div>
						</div>
					</div>
				</div>
				<form
					className='flex h-full basis-1/2 flex-col items-start justify-center px-[66px]'
					onSubmit={handleOnSubmit}>
					<header className='mb-5 text-black'>
						<h1 className='text-5xl font-extrabold'>Forgot Password ?</h1>
						<h3 className='mt-3 text-2xl font-normal'>Reset your password</h3>
					</header>

					<div className='flex w-full flex-col items-start justify-center py-10'>
						<label className='pb-3 text-lg font-medium text-[#9F9F9F]'>
							Your email address
						</label>
						<input
							type='email'
							placeholder=''
							value={email}
							onChange={handleOnChange}
							className='w-full border-b-2 border-[#9F9F9F] p-2 focus:outline-none'
							required
							disabled={loading}
						/>
					</div>

					<button
						type='submit'
						className={`btn-primary btn text-xl font-bold  capitalize text-white ${
							loading ? 'loading cursor-not-allowed' : 'cursor-pointer'
						}`}>
						Process
					</button>
				</form>
			</div>
		</>
	);
}
