import { useState } from "react";

export default function ReportCategoryModal({
	reportCategory,
	setReportCategory,
	handleOnConfirm,
	showModal,
	setShowModal,
}) {
	return (
		<div className='absolute inset-0 z-[99] mx-auto my-auto h-fit w-[478px] rounded-2xl border bg-white p-6 shadow-lg drop-shadow-xl'>
			<div className='relative flex h-full w-full flex-col items-center justify-center'>
				<label
					className='btn-sm btn-circle btn absolute -right-2 -top-2'
					onClick={() => {
						setShowModal(!showModal);
						setReportCategory();
					}}>
					✕
				</label>
				<h3 className='text-lg font-bold'>Add new report category</h3>
				<div className='mb-8 w-full'>
					<label className='label'>
						<span className='label-text'>Nama category</span>
					</label>
					<input
						type='text'
						placeholder='Tulis disini...'
						className='input-bordered input w-full'
						value={reportCategory}
						onChange={(e) => setReportCategory(e.target.value)}
					/>
				</div>
				<div className='flex gap-2'>
					<button
						className='btn-error btn-sm btn text-white'
						onClick={() => {
							setShowModal(!showModal);
							setReportCategory("");
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
