import React from 'react';

export default function DeleteModal({
	setIsDelete,
	propName,
	handleOnConfirm,
}) {
	return (
		<div className='absolute inset-0 z-[99] mx-auto my-auto h-[230px] w-[478px] rounded-2xl border bg-white p-6 shadow-lg drop-shadow-xl'>
			<div className='relative flex h-full w-full flex-col items-center justify-center'>
				<label
					className='btn-sm btn-circle btn absolute -right-2 -top-2'
					onClick={() => {
						setIsDelete(false);
					}}>
					✕
				</label>
				<h3 className='text-lg font-bold'>Apakah anda yakin?</h3>
				<p className='text-center'>
					Anda akan menghapus <span className='font-semibold'>{propName}</span>
					?, dan tidak dapat dikembalikan lagi.
				</p>
				<div className='mt-8 flex gap-4'>
					<button
						className='btn-error btn-sm btn text-white'
						onClick={() => {
							setIsDelete(false);
						}}>
						Cancel
					</button>
					<button
						className='btn-success btn-sm btn text-white'
						onClick={handleOnConfirm}>
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}
