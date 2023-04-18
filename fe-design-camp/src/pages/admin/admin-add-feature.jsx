import { useState, useRef } from 'react';
import { TiPlus } from 'react-icons/ti';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import DeleteModal from '@/components/modal/delete-modal';
import AdminCategoryModal from '@/components/modal/admin-category-modal';
import AdminToolModal from '@/components/modal/admin-tool-modal';
import Image from 'next/image';

import { SuccessToast, ErrorToast } from '@/components/toast/alert-taost';

import { useDispatch, useSelector } from 'react-redux';
import {
	createCategory,
	deleteCategory,
	updateCategory,
} from '@/store/categories/categories.action';
import { createTool, updateTool, deleteTool } from '@/store/tools/tools.action';
import { selectCategories } from '@/store/categories/categories.selector';
import { selectTools } from '@/store/tools/tools.selector';

export default function AdminAddFeature() {
	const BE_BASE_URL = 'http://localhost:3000';
	const dispatch = useDispatch();

	const { total_category, categories } = useSelector(selectCategories);
	const { total_tool, tools } = useSelector(selectTools);

	//Category
	const [category, setCategory] = useState('');
	const [isAddCategory, setIsAddCategory] = useState(false);
	const [isEditCategory, setIsEditCategory] = useState(false);

	const handleOnDeleteCategory = async (id) => {
		await dispatch(
			deleteCategory({
				id,
			})
		).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
		});
		setIsCategoryDelete(false);
	};

	const handleCreateCategory = async () => {
		await dispatch(
			createCategory({
				name: category,
			})
		).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
		});
		setCategory('');
		setIsAddCategory(false);
	};

	const handleOnEditCategory = async (id, name) => {
		await dispatch(
			updateCategory({
				id,
				name,
			})
		).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
		});
		setIsEditCategory(false);
	};

	// Public
	const [modalData, setModalData] = useState(null);
	const [isCategoryDelete, setIsCategoryDelete] = useState(false);
	const [id, setId] = useState(null);

	//Tool
	const [isToolDelete, setIsToolDelete] = useState(false);
	const [isEditTool, setIsEditTool] = useState(false);
	const [previewToolIcon, setPreviewToolIcon] = useState(null);
	const [tool, setTool] = useState('');
	const [isAddTool, setIsAddTool] = useState(false);
	const [logoTool, setLogoTool] = useState(null);
	const logoToolRef = useRef(null);

	const handleLogoTool = () => {
		logoToolRef.current.click();
	};

	const handleLogoToolChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setPreviewToolIcon(URL.createObjectURL(e.target.files[0]));
			setLogoTool(e.target.files[0]);
		}
	};

	const handleCreateTool = async () => {
		await dispatch(
			createTool({
				tool_icon: logoTool,
				name: tool,
			})
		).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
		});
		setTool('');
		setLogoTool(null);
		setIsAddTool(false);
	};

	const handleUpdateTool = async (id, { newName, tool_icon }) => {
		await dispatch(
			updateTool({
				id,
				newName,
				tool_icon,
			})
		).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
		});

		setIsEditTool(false);
	};

	const handleOnDeleteTool = async (id) => {
		await dispatch(
			deleteTool({
				id,
			})
		).then((res) => {
			if (res.meta.requestStatus === 'fulfilled') {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
		});
		setIsToolDelete(false);
	};

	return (
		<section className='relative h-full'>
			<header className='text-xl font-bold'>Add Feature</header>
			<section
				className={`mt-5 flex items-center justify-between gap-10 ${
					(isAddCategory ||
						isAddTool ||
						isToolDelete ||
						isEditCategory ||
						isCategoryDelete) &&
					'blur-sm'
				}`}>
				{/* Table Categories */}
				<div className='flex-1 overflow-x-auto'>
					<h1 className='font-bold'>Categories</h1>
					<table className='table w-full'>
						<thead>
							<tr>
								<th>No</th>
								<th>Name</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{categories.map((category, index) => (
								<tr key={category.id}>
									<th>{index + 1}</th>
									<td>{category.name}</td>
									<td className='flex gap-1'>
										<button
											title='Edit category'
											className='btn-info btn-sm btn-circle btn text-white'
											onClick={() => {
												setIsEditCategory(true);
												setCategory(category.name);
												setId(category.id);
											}}>
											<FiEdit3 size={18} />
										</button>
										<button
											title='Delete category'
											className='btn-error btn-sm btn-circle btn text-white'
											onClick={() => {
												setIsCategoryDelete(true);
												setModalData(category.name);
												setId(category.id);
											}}>
											<FiTrash2 size={18} />
										</button>
									</td>
								</tr>
							))}
							<tr className='active'>
								<td colSpan={3} className='text-center'>
									<button
										className='flex w-full items-center justify-center gap-2 text-lg font-bold'
										onClick={() => setIsAddCategory(true)}>
										<TiPlus size={18} />
										Add new category
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>

				{/* Table Tools */}
				<div className='flex-1 overflow-x-auto'>
					<h1 className='font-bold'>Tools</h1>
					<table className='table w-full'>
						<thead>
							<tr>
								<th>No</th>
								<th>Icon</th>
								<th>Name</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{tools.map((tool, index) => (
								<tr key={tool.id}>
									<th>{index + 1}</th>
									<td>
										<Image
											src={
												tool.icon.includes('uploads')
													? `${BE_BASE_URL}/${tool.icon}`
													: tool.icon
											}
											alt={tool.name}
											width={50}
											height={50}
										/>
									</td>
									<td>{tool.name}</td>
									<td className='flex gap-1'>
										<button
											title='Edit tool'
											className='btn-info btn-sm btn-circle btn text-white'>
											<FiEdit3
												size={18}
												onClick={() => {
													setIsEditTool(true);
													setTool(tool.name);
													setLogoTool(tool.icon);
													setId(tool.id);
												}}
											/>
										</button>
										<button
											title='Delete tool'
											className='btn-error btn-sm btn-circle btn text-white'
											onClick={() => {
												setIsToolDelete(true);
												setModalData(tool.name);
												setId(tool.id);
											}}>
											<FiTrash2 size={18} />
										</button>
									</td>
								</tr>
							))}
							<tr className='active'>
								<td colSpan={4} className='text-center'>
									<button
										className='flex w-full items-center justify-center gap-2 text-lg font-bold'
										onClick={() => setIsAddTool(true)}>
										<TiPlus size={18} />
										Add new tool
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</section>

			{/* Delete modal */}
			{isCategoryDelete && (
				<DeleteModal
					setIsDelete={setIsCategoryDelete}
					propName={modalData}
					handleOnConfirm={() => handleOnDeleteCategory(id)}
				/>
			)}

			{isToolDelete && (
				<DeleteModal
					setIsDelete={setIsToolDelete}
					propName={modalData}
					handleOnConfirm={() => handleOnDeleteTool(id)}
				/>
			)}

			{/* Modal Add Category */}
			{isAddCategory && (
				<AdminCategoryModal
					closeModal={setIsAddCategory}
					title='Tambahakan category baru'
					category={category}
					setCategory={setCategory}
					handleOnConfirm={handleCreateCategory}
				/>
			)}

			{/* Modal Edit Category */}
			{isEditCategory && (
				<AdminCategoryModal
					closeModal={setIsEditCategory}
					title='Edit nama category'
					category={category}
					setCategory={setCategory}
					handleOnConfirm={() => handleOnEditCategory(id, category)}
				/>
			)}

			{/* Modal Add Tool */}
			{isAddTool && (
				<AdminToolModal
					closeModal={setIsAddTool}
					title='Tambahakan tool baru'
					tool={tool}
					setTool={setTool}
					setIsAddTool={setIsAddTool}
					setPreviewToolIcon={setPreviewToolIcon}
					setLogoTool={setLogoTool}
					logoTool={previewToolIcon}
					logoToolRef={logoToolRef}
					handleLogoTool={handleLogoTool}
					handleLogoToolChange={handleLogoToolChange}
					handleOnConfirm={handleCreateTool}
				/>
			)}
			{/* Modal Add Tool End */}

			{/* modal update tool */}
			{isEditTool && (
				<AdminToolModal
					title='Edit tool'
					closeModal={setIsEditTool}
					tool={tool}
					setTool={setTool}
					setIsAddTool={setIsAddTool}
					setLogoTool={setLogoTool}
					logoTool={logoTool}
					previewToolIcon={previewToolIcon}
					setPreviewToolIcon={setPreviewToolIcon}
					logoToolRef={logoToolRef}
					handleLogoTool={handleLogoTool}
					handleLogoToolChange={handleLogoToolChange}
					handleOnConfirm={() =>
						handleUpdateTool(id, {
							newName: tool,
							tool_icon: logoTool,
						})
					}
				/>
			)}
		</section>
	);
}
