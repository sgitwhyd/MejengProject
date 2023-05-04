import { useState, useRef, useEffect, useMemo } from "react";
import { FiPlus } from "react-icons/fi";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import DeleteModal from "@/components/modal/delete-modal";
import AdminCategoryModal from "@/components/modal/admin-category-modal";
import AdminToolModal from "@/components/modal/admin-tool-modal";
import Image from "next/image";

import { SuccessToast, ErrorToast } from "@/components/toast/alert-taost";
import Table from "@/components/table";

import { useDispatch, useSelector } from "react-redux";
import {
	createCategory,
	deleteCategory,
	updateCategory,
} from "@/store/categories/categories.action";
import { createTool, updateTool, deleteTool } from "@/store/tools/tools.action";
import { selectCategories } from "@/store/categories/categories.selector";
import { selectTools } from "@/store/tools/tools.selector";
import { fetchCategories } from "@/store/categories/categories.action";
import { fetchTools } from "@/store/tools/tools.action";

export default function AdminAddFeature() {
	const BE_BASE_URL = "http://localhost:3000";
	const dispatch = useDispatch();

	const [status, setStatus] = useState(null);

	const { total_category, categories } = useSelector(selectCategories);
	const { total_tool, tools } = useSelector(selectTools);

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchTools());
	}, [status]);

	//Category
	const [category, setCategory] = useState({
		name: "",
		desc: "",
	});
	const [isAddCategory, setIsAddCategory] = useState(false);
	const [isEditCategory, setIsEditCategory] = useState(false);

	const handleOnDeleteCategory = async (id) => {
		await dispatch(
			deleteCategory({
				id,
			})
		).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
			setStatus(res.meta.requestId);
		});
		setIsCategoryDelete(false);
	};

	const handleCreateCategory = async () => {
		await dispatch(
			createCategory({
				name: category.name,
				desc: category.desc,
			})
		).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
			setStatus(res.meta.requestId);
		});

		setCategory("");
		setIsAddCategory(false);
	};

	const handleOnEditCategory = async (id) => {
		await dispatch(
			updateCategory({
				id,
				name: category.name,
				desc: category.desc,
			})
		).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
			setStatus(res.meta.requestId);
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
	const [tool, setTool] = useState("");
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
			if (res.meta.requestStatus === "fulfilled") {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
			setStatus(res.meta.requestId);
		});
		setTool("");
		setLogoTool(null);
		setIsAddTool(false);
		setPreviewToolIcon(null);
	};

	const handleUpdateTool = async (id, { newName, tool_icon }) => {
		await dispatch(
			updateTool({
				id,
				newName,
				tool_icon,
			})
		).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
			setStatus(res.meta.requestId);
		});

		setIsEditTool(false);
	};

	const handleOnDeleteTool = async (id) => {
		await dispatch(
			deleteTool({
				id,
			})
		).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				SuccessToast(res.payload.message);
			} else {
				ErrorToast(res.payload.error.message);
			}
			setStatus(res.meta.requestId);
		});
		setIsToolDelete(false);
	};

	const TABLE_HEADER_CATEGORIES = useMemo(
		() => [
			{
				Header: "No",
				accessor: "no",
			},
			{
				Header: "Name",
				accessor: "name",
			},
			{
				Header: "Short Desc",
				accessor: "desc",
			},
			{
				Header: "Action",
				accessor: "action",
			},
		],
		[]
	);

	const TABLE_HEADER_TOOLS = useMemo(
		() => [
			{
				Header: "No",
				accessor: "no",
			},
			{
				Header: "Icon",
				accessor: "icon",
			},
			{
				Header: "Name",
				accessor: "name",
			},
			{
				Header: "Action",
				accessor: "action",
			},
		],
		[]
	);

	const TABLE_TOOLS_DATA = useMemo(
		() => [
			...tools.map((tool, index) => ({
				no: index + 1,
				icon: (
					<img
						src={
							tool.icon.includes("uploads")
								? `${BE_BASE_URL}/${tool.icon}`
								: tool.icon
						}
						alt={tool.name}
						className='w-auto'
					/>
				),
				name: tool.name,
				action: (
					<div className='flex h-28 items-center gap-1'>
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
					</div>
				),
			})),
		],
		[tools]
	);

	const TABLE_CATEGORIES_DATA = useMemo(
		() => [
			...categories.map((category, index) => ({
				no: index + 1,
				name: category.name,
				desc: <div className='break-words'>{category.desc}</div>,
				action: (
					<div className='flex h-28 items-center justify-center gap-1'>
						<button
							title='Edit category'
							className='btn-info btn-sm btn-circle btn text-white'
							onClick={() => {
								setIsEditCategory(true);
								setCategory({
									name: category.name,
									desc: category.desc,
								});
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
					</div>
				),
			})),
		],
		[categories]
	);

	return (
		<section className='relative h-full'>
			<header className='text-xl font-bold'>Add Feature</header>
			<section
				className={`mt-5 grid max-h-screen grid-cols-2 gap-5 ${
					(isAddCategory ||
						isAddTool ||
						isToolDelete ||
						isEditCategory ||
						isCategoryDelete) &&
					"blur-sm"
				}`}>
				{/* Table Categories */}
				<div>
					<div className='mb-5 flex items-center justify-between'>
						<h1 className=' font-bold'>Categories</h1>
						<button
							onClick={() => setIsAddCategory(true)}
							className='btn-primary no-animation btn flex justify-center'>
							<FiPlus size={20} />
						</button>
					</div>
					<Table
						columns={TABLE_HEADER_CATEGORIES}
						data={TABLE_CATEGORIES_DATA}
						numberToShow={3}
					/>
				</div>

				{/* Table Tools */}
				<div>
					<div className='mb-5 flex items-center justify-between'>
						<h1 className=' font-bold'>Tools</h1>
						<button
							onClick={() => setIsAddTool(!isAddTool)}
							className='btn-primary no-animation btn flex justify-center'>
							<FiPlus size={20} />
						</button>
					</div>
					<Table
						columns={TABLE_HEADER_TOOLS}
						data={TABLE_TOOLS_DATA}
						numberToShow={3}
					/>
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
					handleOnConfirm={() => handleOnEditCategory(id)}
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
