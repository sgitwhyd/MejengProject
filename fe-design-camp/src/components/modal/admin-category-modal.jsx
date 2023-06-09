export default function AdminCategoryModal({
	closeModal,
	title,
	category,
	setCategory,
	handleOnConfirm,
}) {
	return (
		<div className='absolute inset-0 z-[99] mx-auto my-auto h-fit w-[478px] rounded-2xl border bg-white p-6 shadow-lg drop-shadow-xl'>
			<div className='relative flex h-full w-full flex-col items-center justify-center'>
				<label
					className='btn-sm btn-circle btn absolute -right-2 -top-2'
					onClick={() => {
						closeModal(false);
						setCategory({
							name: "",
							desc: "",
						});
					}}>
					✕
				</label>
				<h3 className='text-lg font-bold'>{title}</h3>
				<div className='mb-8 w-full'>
					<label className='label'>
						<span className='label-text'>Nama category</span>
					</label>
					<input
						type='text'
						placeholder='Tulis disini...'
						className='input-bordered input w-full'
						value={category.name}
						onChange={(e) =>
							setCategory({
								...category,
								name: e.target.value,
							})
						}
					/>
					<label className='label'>
						<span className='label-text'>Deskripsi category</span>
					</label>
					<input
						type='text'
						placeholder='Tulis disini...'
						className='input-bordered input w-full'
						value={category.desc}
						onChange={(e) =>
							setCategory({
								...category,
								desc: e.target.value,
							})
						}
					/>
				</div>
				<div className='flex gap-2'>
					<button
						className='btn-error btn-sm btn text-white'
						onClick={() => {
							closeModal(false);
							setCategory("");
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
