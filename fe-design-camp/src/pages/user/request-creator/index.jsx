import Head from 'next/head';
import Button from '@/components/button/button';
import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from '@/store/auth/auth.selector';
import { useRouter } from 'next/router';
import { requestCreator } from '@/store/auth/auth.action';
import { SuccessToast, ErrorToast } from '@/components/toast/alert-taost';

export default function RequestCreator() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [agree, setAgree] = useState(false);

	const { loading } = useSelector(selectAuth);

	const handleOnChange = (e) => {
		const { checked } = e.target;
		setAgree(checked);
	};

	const handleRequestCreator = async () => {
		await dispatch(requestCreator()).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				SuccessToast(res.payload.message);
				router.push('/user/profile');
			} else {
				ErrorToast(res.payload.error.message);
			}
		});
	};

	return (
		<>
			<Head>
				<title>Request Creator - Mejeng</title>
				<meta name='description' content='Request Creator' />
			</Head>
			<section className='flex flex-col items-center justify-center'>
				<h1 className='mb-8 text-2xl font-bold'>
					Rules to become a creator in{' '}
					<span className='text-primary'>Mejeng</span>
				</h1>
				<ol className='list-decimal text-xl font-semibold'>
					<li className='mb-3'>
						Having a suitable design that can be showcased on Mejeng platform.
					</li>
					<li className='mb-3'>
						Willing to collaborate and interact with others on the Mejeng
						platform.
					</li>
					<li className='mb-3'>
						Having a valid and active account on the Mejeng platform. Not
						copying or
					</li>
					<li className='mb-3'>
						using other people's work without permission. Maintaining the
						quality of
					</li>
					<li className='mb-3'>
						the showcased work and staying creative in designing. Providing
						valid
					</li>
					<li className='mb-3'>
						and accurate information on your Mejeng profile.
					</li>
				</ol>
				<p className='mt-5 w-[800px] text-base font-semibold text-primary'>
					*) We reserve the right to reject a request to become a Creator on
					Mejeng and terminate your account if the above criteria are not met or
					if there is any violation of ethics or applicable rules on your part.
					<div className='form-control mt-3 w-fit'>
						<label className='label cursor-pointer gap-3'>
							<input
								type='checkbox'
								className='checkbox'
								onChange={handleOnChange}
							/>
							<span className='label-text text-base font-bold'>
								I agree with the rules and conditions above
							</span>
						</label>
					</div>
				</p>
				<div className='mt-10 flex gap-3'>
					<button className='no-animation btn border-none bg-primary capitalize hover:bg-primary/90'>
						<Link className='text-white hover:text-white' href='/user/profile'>
							Cancel
						</Link>
					</button>
					<button
						className={`no-animation btn border-none bg-primary capitalize hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-red-500 disabled:text-white ${
							loading ? 'loading' : ''
						}`}
						disabled={!agree}
						onClick={handleRequestCreator}>
						Request as Creator
					</button>
				</div>
			</section>
		</>
	);
}
