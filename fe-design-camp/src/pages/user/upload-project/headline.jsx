import { useState } from 'react';
import ImageUploadCard from '@/components/cards/image-upload-card';

export default function Headline(props) {
	const { thumbnail, setThumbnail } = props;
	const { title, setTitle } = props;

	const [charactersLeave, setCharactersLeave] = useState(100);

	const handleCharactersLeave = (e) => {
		const inputLength = e.target.value.length;
		setCharactersLeave(100 - inputLength);
	};

	const handleFileChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setThumbnail({
				preview: URL.createObjectURL(e.target.files[0]),
				file: e.target.files[0],
			});
		}
	};
	return (
		<section className='mt-10 mb-5 flex flex-col items-center justify-center gap-5'>
			<div className='relative flex w-full flex-col items-center justify-center gap-3'>
				<label className='text-2xl font-medium'>Your title here</label>
				<input
					type='text'
					className='duraiton-300 w-full rounded-md border px-4 py-4 text-lg font-semibold outline-slate-400 transition-all'
					placeholder='....'
					maxLength={100}
					value={title}
					name='title'
					onChange={(e) => {
						setTitle(e.target.value);
						handleCharactersLeave(e);
					}}
				/>
				<p className='absolute bottom-1 right-2 text-xs'>
					{charactersLeave} characters leave
				</p>
			</div>
			<ImageUploadCard
				image={thumbnail.preview}
				inputName='thumbnail_project_image'
				title={'Upload your Project Thumbnail'}
				handleFileChange={handleFileChange}
			/>
		</section>
	);
}
