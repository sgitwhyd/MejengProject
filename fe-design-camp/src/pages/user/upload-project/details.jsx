import Link from 'next/link';
import { AiOutlineLink } from 'react-icons/ai';
import ImageUploadCard from '@/components/cards/image-upload-card';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { selectCategories } from '@/store/categories/categories.selector';
import { selectTools } from '@/store/tools/tools.selector';

export default function Details(props) {
	const { categories } = useSelector(selectCategories);
	const { tools } = useSelector(selectTools);
	// State for link? checkbox
	const { isActived, setIsActived } = props;

	// State for image upload
	const { moreImage1, setMoreImage1 } = props;
	const { moreImage2, setMoreImage2 } = props;
	const { image1, setImage1 } = props;
	const { image2, setImage2 } = props;
	const { image3, setImage3 } = props;

	const { description, setDescription } = props;
	const { isCategory, setIsCategory } = props;
	const { checkedTools, setCheckedTools } = props;
	const { link, setLink } = props;

	const handleFileChange1 = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImage1({
				file: e.target.files[0],
				preview: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	const handleFileChange2 = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImage2({
				file: e.target.files[0],
				preview: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	const handleFileChange3 = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImage3({
				file: e.target.files[0],
				preview: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	const handleCancel2 = () => {
		setImage2({
			file: null,
			preview: '',
		});
		setMoreImage1(false);
	};
	const handleCancel3 = () => {
		setImage3({
			file: null,
			preview: '',
		});
		setMoreImage2(false);
	};

	const handleCheckboxChange = (event) => {
		const tool = Number(event.target.value);
		if (event.target.checked) {
			setCheckedTools((prevCheckedTools) => [...prevCheckedTools, tool]);
		} else {
			setCheckedTools((prevCheckedTools) =>
				prevCheckedTools.filter((checkedTool) => checkedTool !== tool)
			);
		}
	};

	const modules = {
		toolbar: [['bold', 'italic', 'underline'], ['link']],
	};

	return (
		<section className='mt-10 mb-5 flex flex-col items-center justify-center gap-5'>
			<p className='text-2xl font-medium'>Project Details</p>
			<ImageUploadCard
				image={image1.preview}
				inputName='project_image'
				title={'Upload your project image details'}
				handleFileChange={handleFileChange1}
			/>
			{image1.preview && !moreImage1 && (
				<button
					onClick={() => {
						setMoreImage1(true);
					}}
					className='underline-animation text-sm'>
					Upload Another Image?
				</button>
			)}
			{moreImage1 && (
				<ImageUploadCard
					image={image2.preview}
					inputName='project_image'
					title={'Upload more project image details'}
					handleFileChange={handleFileChange2}
					handleCancel={handleCancel2}
				/>
			)}
			{image2.preview && !moreImage2 && (
				<button
					onClick={() => {
						setMoreImage2(true);
					}}
					className='underline-animation text-sm'>
					Upload Another Image?
				</button>
			)}
			{moreImage2 && (
				<ImageUploadCard
					image={image3.preview}
					inputName='project_image'
					title={'Upload more project image details'}
					handleFileChange={handleFileChange3}
					handleCancel={handleCancel3}
				/>
			)}
			<div className='flex w-full flex-col items-start justify-start'>
				<label>Description</label>
				<ReactQuill
					value={description}
					onChange={setDescription}
					modules={modules}
					className='w-full'
				/>
			</div>

			<div className='flex w-full flex-col items-start justify-start'>
				<label>Category</label>
				<select
					className='select-bordered select w-full flex-1'
					value={isCategory}
					name='CategoryId'
					onChange={(e) => {
						setIsCategory(e.target.value);
					}}>
					<option>Choose category</option>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</div>

			<div className='flex w-full flex-col items-start justify-start'>
				<label>Tools</label>
				<div className='grid w-full grid-cols-5 gap-3'>
					{tools.map((tool) => {
						return (
							<label
								key={tool.id}
								className='flex cursor-pointer items-start justify-evenly gap-2 rounded-xl border py-2 px-1'>
								<input
									type='checkbox'
									className='checkbox'
									value={tool.id}
									name='ToolId'
									onChange={handleCheckboxChange}
									checked={checkedTools.includes(tool.id)}
								/>
								{tool.name}
							</label>
						);
					})}
				</div>
			</div>

			<div className='flex w-full flex-col items-start justify-start gap-3'>
				<div className='flex items-center justify-center gap-2'>
					<label>Link Project</label>
					<input
						type='checkbox'
						checked={isActived}
						onChange={() => {
							setIsActived(!isActived);
						}}
						className='checkbox'
					/>
				</div>
				{isActived ? (
					<div className='relative flex w-full items-center justify-center'>
						<AiOutlineLink className='absolute left-3 h-8 w-8 border-r-2 pr-2' />
						<input
							type='url'
							placeholder='https://example.com'
							pattern='https://.*'
							id='url'
							name='url'
							className='input-bordered input w-full pl-14'
							value={link}
							maxLength={100}
							onChange={(e) => {
								setLink(e.target.value);
							}}
						/>
					</div>
				) : (
					<Link className='underline-animation' href='/FAQ' target='_blank'>
						What is Link Project?
					</Link>
				)}
			</div>
		</section>
	);
}
