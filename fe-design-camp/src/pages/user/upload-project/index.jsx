import Head from 'next/head';
import { useEffect, useState } from 'react';
import Headline from './headline';
import Details from './details';
import Review from './review';
import {
	WarningToast,
	SuccessToast,
	ErrorToast,
} from '@/components/toast/alert-taost';
import { useDispatch, useSelector } from 'react-redux';
import { createProject } from '@/store/user/user.action';
import { selectUser } from '@/store/user/user.selector';
import { useRouter } from 'next/router';

export default function UploadProject() {
	const dispatch = useDispatch();
	const router = useRouter();

	const { loading } = useSelector(selectUser);

	const [step, setStep] = useState(1);

	const [uploadProjectPayload, setUploadProjectPayload] = useState({
		thumbnail_project_image: null,
		title: '',
		desc: '',
		CategoryId: '',
		ToolId: [],
		url: '',
		project_image: null,
	});

	// Headline
	const [thumbnail, setThumbnail] = useState({
		preview: '',
		file: null,
	});
	const [title, setTitle] = useState('');

	// Details
	const [isActived, setIsActived] = useState(false);
	const [moreImage1, setMoreImage1] = useState(false);
	const [moreImage2, setMoreImage2] = useState(false);
	const [image1, setImage1] = useState({
		preview: '',
		file: null,
	});
	const [image2, setImage2] = useState({
		preview: '',
		file: null,
	});
	const [image3, setImage3] = useState({
		preview: '',
		file: null,
	});
	const [description, setDescription] = useState('');
	const [isCategory, setIsCategory] = useState('');
	const [checkedTools, setCheckedTools] = useState([]);
	const [link, setLink] = useState('');

	const handlePrevStep = () => {
		setStep(step - 1);
	};

	useEffect(() => {
		const tools = checkedTools.join(',');

		setUploadProjectPayload({
			thumbnail_project_image: thumbnail.file,
			title: title,
			desc: description,
			CategoryId: isCategory,
			ToolId: tools,
			url: link,
			project_image: [image1?.file, image2?.file, image3?.file],
		});
	}, [
		thumbnail,
		title,
		description,
		isCategory,
		checkedTools,
		link,
		image1,
		image2,
		image3,
	]);

	const handleOnSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();

		const projectI = [image1.file];

		if (image2.file) {
			projectI.push(image2.file);
		}

		if (image3.file) {
			projectI.push(image3.file);
		}

		for (let img of projectI) {
			formData.append('project_image', img);
		}

		formData.append('title', uploadProjectPayload.title);
		formData.append('desc', uploadProjectPayload.desc);
		formData.append('CategoryId', uploadProjectPayload.CategoryId);
		formData.append('ToolId', uploadProjectPayload.ToolId);
		formData.append('url', uploadProjectPayload.url);
		formData.append(
			'thumbnail_project_image',
			uploadProjectPayload.thumbnail_project_image
		);

		await dispatch(createProject(formData)).then((res) => {
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
				<title>Upload Your Project - Mejeng</title>
				<meta name='description' content='Upload your personal project here!' />
			</Head>
			<section className='mx-auto max-w-[1024px]'>
				<form onSubmit={handleOnSubmit}>
					<section className='mx-auto flex max-w-[800px] items-center justify-center'>
						<div className='flex flex-1 flex-col items-center justify-center gap-3 text-sm font-semibold'>
							<button
								onClick={() => {
									setStep(1);
								}}
								className={`h-8 w-8 rounded-full text-white ${
									step >= 1 ? 'bg-primary' : 'bg-gray-300'
								}`}>
								<p>1</p>
							</button>
							<p>Give a title and thumbnail image</p>
						</div>
						<div className='flex flex-1 flex-col items-center justify-center gap-3 text-sm font-semibold'>
							<button
								onClick={() => {
									title.trim() === '' || thumbnail === null
										? WarningToast('Please fill in all required fields')
										: setStep(2);
								}}
								className={`h-8 w-8 rounded-full text-white ${
									step >= 2 ? 'bg-primary' : 'bg-gray-300'
								}`}>
								<p>2</p>
							</button>
							<p>Give some details</p>
						</div>
						<div className='flex flex-1 flex-col items-center justify-center gap-3 text-sm font-semibold'>
							<button
								onClick={() => {
									description.trim() === '' ||
									image1 === null ||
									isCategory === '' ||
									checkedTools.length === 0
										? WarningToast('Please fill in all required fields')
										: setStep(3);
								}}
								className={`h-8 w-8 rounded-full text-white ${
									step >= 3 ? 'bg-primary' : 'bg-gray-300'
								}`}>
								<p>3</p>
							</button>
							<p>Review your post</p>
						</div>
					</section>

					{/* Step page view */}
					{step === 1 && (
						<Headline
							title={title}
							setTitle={setTitle}
							thumbnail={thumbnail}
							setThumbnail={setThumbnail}
						/>
					)}
					{step === 2 && (
						<Details
							setIsActived={setIsActived}
							moreImage1={moreImage1}
							setMoreImage1={setMoreImage1}
							moreImage2={moreImage2}
							setMoreImage2={setMoreImage2}
							image1={image1}
							setImage1={setImage1}
							image2={image2}
							setImage2={setImage2}
							image3={image3}
							setImage3={setImage3}
							description={description}
							setDescription={setDescription}
							isCategory={isCategory}
							setIsCategory={setIsCategory}
							checkedTools={checkedTools}
							setCheckedTools={setCheckedTools}
							isActived={isActived}
							link={link}
							setLink={setLink}
						/>
					)}
					{step === 3 && (
						<Review
							title={title}
							thumbnail={thumbnail}
							description={description}
							image1={image1}
							moreImage1={moreImage1}
							image2={image2}
							moreImage2={moreImage2}
							image3={image3}
							isCategory={isCategory}
							checkedTools={checkedTools}
							isActived={isActived}
							link={link}
						/>
					)}

					{/* Step button */}
					<div className='mt-10 flex w-full items-center justify-end'>
						{step === 1 && (
							<button
								className='w-[125px] rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80'
								onClick={() => {
									title.trim() === '' || thumbnail === null
										? WarningToast('Please fill in all required fields')
										: setStep(2);
								}}>
								Next
							</button>
						)}
						{step === 2 && (
							<div className='flex items-center justify-center gap-3'>
								<button
									className='w-[125px] rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80'
									onClick={handlePrevStep}>
									Prev
								</button>
								<button
									className='w-[125px] rounded-md bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80'
									onClick={() => {
										description.trim() === '' ||
										image1 === null ||
										isCategory === '' ||
										checkedTools.length === 0
											? WarningToast('Please fill in all required fields')
											: setStep(3);
									}}>
									Next
								</button>
							</div>
						)}
						{step === 3 && (
							<div className='flex items-center justify-center gap-3'>
								<button
									className='btn w-[125px] rounded-md border-none bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80'
									onClick={handlePrevStep}>
									Prev
								</button>
								<button
									type='submit'
									className={`${
										loading ? 'loading' : ''
									} btn w-[125px] rounded-md border-none bg-primary px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary/80`}>
									Publish
								</button>
							</div>
						)}
					</div>
				</form>
			</section>
		</>
	);
}
