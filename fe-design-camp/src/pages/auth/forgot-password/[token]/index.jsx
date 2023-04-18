import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import forgotPasswordHero from '@/assets/auth/forgot-password-hero.png';
import MejengLogo from '@/assets/mejeng-logo-white.svg';
import { BsFillEyeSlashFill, BsFillEyeFill } from 'react-icons/bs';
import { BiArrowBack } from 'react-icons/bi';
import { ErrorToast, SuccessToast } from '@/components/toast/alert-taost';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '@/store/auth/auth.action';

const ResetPasswordPage = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { token } = router.query;

	const [password, setPassword] = React.useState('');
	const [confirmPassword, setConfirmPassword] = React.useState('');

	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const handleShowPassword = (e) => {
		if (e.target.id === 'password') {
			setShowPassword(!showPassword);
		} else if (e.target.id === 'confirmPassword') {
			setShowConfirmPassword(!showConfirmPassword);
		}
	};

	const handleOnChange = (e) => {
		if (e.target.name === 'password') {
			setPassword(e.target.value);
		} else if (e.target.name === 'confirmPassword') {
			setConfirmPassword(e.target.value);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password !== confirmPassword) {
			ErrorToast("password doesn't match");
			return;
		}

		await dispatch(forgotPassword({ 
			email: null,
			'new_password': password,
			token
		 })).then((res) => {
			if (res.meta.requestStatus === 'rejected') {
				ErrorToast(res.payload.error.message);
			} else {
				SuccessToast('Password reset successfully');
				router.push('/auth/login');
			}
		})

	};

	return (
		<>
			<Head>
				<title>Forgot Password - Mejeng</title>
				<meta name='description' content='Forgot account password Mejeng' />
			</Head>
			<div className='grid md:grid-cols-2'>
				<div className='relative hidden h-screen lg:block'>
					<Link
						href='/auth/login'
						className='tooltip z-50 tooltip-right absolute top-5 left-5 rounded-full bg-white p-2 text-black '
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
				<div className='flex h-screen flex-col justify-center px-14 '>
					<header className='mb-24 text-black'>
						<h1 className='text-5xl font-extrabold'>Forgot Password ?</h1>
						<h3 className='mt-3 text-2xl font-normal'>Reset your password</h3>
					</header>
					<form
						className='flex flex-col justify-center'
						onSubmit={handleSubmit}>
						<div className='mx-auto mb-6 flex w-full flex-col items-start justify-center'>
							<label className='pb-3 text-lg font-medium text-[#9F9F9F]'>
								New Password
							</label>
							<div className='relative w-full'>
								<input
									type={showPassword ? 'text' : 'password'}
									placeholder=''
									name='password'
									value={password}
									onChange={(e) => handleOnChange(e)}
									className='w-full border-b-2 border-[#9F9F9F] p-2 focus:outline-none'
									required
								/>
								<div className='absolute right-0 top-0 cursor-pointer'>
									{showPassword ? (
										<BsFillEyeFill
											id='password'
											onClick={(e) => {
												handleShowPassword(e);
											}}
											size={30}
										/>
									) : (
										<BsFillEyeSlashFill
											id='password'
											onClick={(e) => {
												handleShowPassword(e);
											}}
											size={30}
										/>
									)}
								</div>
							</div>
						</div>
						<div className='mx-auto mb-6 flex w-full flex-col items-start justify-center'>
							<label className='pb-3 text-lg font-medium text-[#9F9F9F]'>
								Confirm Your New Password
							</label>
							<div className='relative w-full'>
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder=''
									name='confirmPassword'
									value={confirmPassword}
									onChange={(e) => handleOnChange(e)}
									className='w-full border-b-2 border-[#9F9F9F] p-2 focus:outline-none'
									required
								/>
								<div className='absolute right-0 top-0'>
									{showConfirmPassword ? (
										<BsFillEyeFill
											id='confirmPassword'
											className='cursor-pointer'
											onClick={(e) => {
												handleShowPassword(e);
											}}
											size={30}
										/>
									) : (
										<BsFillEyeSlashFill
											id='confirmPassword'
											className='cursor-pointer'
											onClick={(e) => {
												handleShowPassword(e);
											}}
											size={30}
										/>
									)}
								</div>
							</div>
						</div>
						<button
							type='submit'
							className='btn-primary btn mx-auto mt-36 w-fit text-xl capitalize'>
							Reset Password
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default ResetPasswordPage;
