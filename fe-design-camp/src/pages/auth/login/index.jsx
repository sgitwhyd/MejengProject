import Head from 'next/head';
import { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Link from 'next/link';
import bgLogin from '@/assets/bg-login.webp';
import Sidebar from '../sidebar';
import { useDispatch } from 'react-redux';
import { authLogin, getUserProfile } from '@/store/auth/auth.action';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/store/auth/auth.selector';
import { ErrorToast, SuccessToast } from '@/components/toast/alert-taost';
import { useRouter } from 'next/router';

export default function Login() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { token } = useSelector(selectAuth);

	const [loginPayload, setLoginPayload] = useState({
		email: '',
		password: '',
	});
	const [showPassword, setShowPassword] = useState(false);

	const handleOnChange = (e) => {
		setLoginPayload({
			...loginPayload,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await dispatch(authLogin(loginPayload)).then((res) => {
			if (res.meta.requestStatus === 'rejected') {
				ErrorToast(res.payload.error.message);
			} else {
				SuccessToast('Login success');
				setTimeout(() => {
					router.push('/');
				}, 1000);
			}
		});

		setLoginPayload({
			email: '',
			password: '',
		});
	};

	useEffect(() => {
		if (token) {
			dispatch(
				getUserProfile({
					token,
				})
			);
		}
	}, [token]);

	return (
		<>
			<Head>
				<title>Login - Mejeng</title>
				<meta name='description' content='Login page Mejeng App ' />
			</Head>

			<div className='flex h-screen items-center justify-center '>
				<Sidebar
					title='Welcome back to'
					image={{
						src: bgLogin,
						alt: 'bg-image-register',
					}}
				/>

				<form
					className='flex h-full basis-1/2 flex-col items-start justify-center px-[66px]'
					onSubmit={handleSubmit}>
					<h2 className='pb-2 text-[44px] font-extrabold'>Login</h2>
					<h3 className='pb-24 text-xl'>
						New user?{' '}
						<Link
							href='/auth/register'
							className='underline-animation text-primary hover:text-primary'>
							Create an account
						</Link>
					</h3>

					<div className='flex w-full flex-col items-start justify-center pb-10'>
						<label className='pb-3 text-lg font-medium text-[#9F9F9F]'>
							Your email address
						</label>
						<input
							type='email'
							placeholder=''
							name='email'
							value={loginPayload.email}
							className='w-full border-b-2 border-[#9F9F9F] p-2 focus:outline-none '
							onChange={handleOnChange}
						/>
					</div>

					<div className='flex w-full flex-col items-start justify-center pb-24'>
						<label className='pb-3 text-lg font-medium text-[#9F9F9F]'>
							Your password
						</label>
						<div className='flex w-full items-center justify-between pb-1'>
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder=''
								name='password'
								value={loginPayload.password}
								className='w-full border-b-2 border-[#9F9F9F] p-2 focus:outline-none '
								onChange={handleOnChange}
							/>
							{showPassword ? (
								<FaEye
									className='h-8 w-8  cursor-pointer text-[#9F9F9F]'
									onClick={() => setShowPassword(!showPassword)}
								/>
							) : (
								<FaEyeSlash
									className='h-8 w-8 cursor-pointer text-[#9F9F9F]'
									onClick={() => setShowPassword(!showPassword)}
								/>
							)}
						</div>
						<Link
							href='/auth/forgot-password'
							className='flex w-full justify-end text-primary'>
							Forgot your password?
						</Link>
					</div>
					<div className='flex w-full items-center justify-center'>
						<button
							type='submit'
							className='rounded-full bg-primary/60 px-[72px] py-[14px] text-xl font-bold text-white transition-all duration-200 hover:bg-primary'>
							Login
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
