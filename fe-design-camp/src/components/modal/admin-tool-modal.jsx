import { FiUpload, FiEdit3 } from 'react-icons/fi';
import Image from 'next/image';
import PreviousMap from 'postcss/lib/previous-map';

export default function AdminToolModal({
	closeModal,
	title,
	tool,
	setTool,
	setIsAddTool,
	setLogoTool,
	logoTool,
	logoToolRef,
	handleLogoTool,
	handleLogoToolChange,
	handleOnConfirm,
	previewToolIcon,
	setPreviewToolIcon,
}) {
	return (
		<div
			className={`absolute inset-0 z-[99] mx-auto my-auto h-fit w-[478px] rounded-2xl border bg-white p-6 shadow-lg drop-shadow-xl`}>
			<div className='relative flex h-full w-full flex-col items-center justify-center'>
				<label
					className='btn-sm btn-circle btn absolute -right-2 -top-2'
					onClick={() => {
						closeModal(false);
						setLogoTool('');
						setTool('');
					}}>
					✕
				</label>
				<h3 className='text-lg font-bold'>{title}</h3>
				<div className='w-full'>
					<label className='label'>
						<span className='label-text'>Logo tool</span>
					</label>
					<div className='relative'>
						{logoTool ? (
							<div className='relative w-1/3'>
								<Image
									src={
										previewToolIcon
											? previewToolIcon
											: logoTool.includes('uploads')
											? `http://localhost:3000/${logoTool}`
											: logoTool
									}
									alt='Uploaded file'
									width={100}
									height={100}
									className='h-full w-full object-cover'
								/>
								<button
									onClick={handleLogoTool}
									className='absolute top-0 right-0 m-2 flex rounded-full border bg-white p-2 shadow-lg hover:bg-gray-100'>
									<FiEdit3 size={20} />
								</button>
								<input
									type='file'
									ref={logoToolRef}
									className='hidden'
									onChange={handleLogoToolChange}
								/>
							</div>
						) : (
							<>
								<div
									onClick={handleLogoTool}
									className='flex w-1/3 cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed border-primary/40 py-3 font-semibold'>
									<FiUpload size={18} />
									<p>Upload logo</p>
								</div>
								<input
									type='file'
									ref={logoToolRef}
									className='hidden'
									name='tool_icon'
									onChange={handleLogoToolChange}
								/>
							</>
						)}
					</div>
				</div>
				<div className='mb-8 w-full'>
					<label className='label'>
						<span className='label-text'>Nama tool</span>
					</label>
					<input
						type='text'
						placeholder='Tulis disini...'
						className='input-bordered input w-full'
						value={tool}
						onChange={(e) => setTool(e.target.value)}
					/>
				</div>
				<div className='flex gap-2'>
					<button
						className='btn-error btn-sm btn text-white'
						onClick={() => {
							setPreviewToolIcon(null);
							closeModal(false);
							setTool('');
							setLogoTool();
						}}>
						Cancel
					</button>
					<button
						className='btn-success btn-sm btn text-white'
						onClick={handleOnConfirm}>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
}
