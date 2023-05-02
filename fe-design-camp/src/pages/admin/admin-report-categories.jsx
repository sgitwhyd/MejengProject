import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectReportCategories } from "@/store/report/report.selector";
import {
	createReportCategory,
	editReportCategory,
	deleteReportCategory,
} from "@/store/report/report.action";
import { fetchReportCategory } from "@/store/report/report.action";

import { ErrorToast, SuccessToast } from "@/components/toast/alert-taost";
import ReportCategoryModal from "@/components/modal/report-category";
import DeleteModal from "@/components/modal/delete-modal";
import { formatedHours } from "@/utils/formated-date";

const ReportCategories = () => {
	const dispatch = useDispatch();

	const [status, setStatus] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [showEditModal, setShowEditModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [reportName, setReportName] = useState("");
	const [modalData, setModalData] = useState({
		id: "",
		name: "",
	});

	const { reportCategories } = useSelector(selectReportCategories);

	useEffect(() => {
		dispatch(fetchReportCategory());
	}, [status]);

	const handleCreateReportCategory = async () => {
		await dispatch(
			createReportCategory({
				name: reportName,
			})
		).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				SuccessToast(res.payload.message);
				setShowModal(false);
			} else {
				ErrorToast(res.payload.error.message);
			}
			setStatus(res.meta.requestId);
		});

		setReportName("");
	};

	const handleEditReportCategory = async () => {
		await dispatch(
			editReportCategory({
				id: modalData.id,
				name: reportName,
			})
		).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				SuccessToast(res.payload.message);
				setShowEditModal(false);
			} else {
				ErrorToast(res.payload.error.message);
			}
			setStatus(res.meta.requestId);
		});
		setReportName("");
	};

	const handleDeleteReportCategory = async () => {
		await dispatch(
			deleteReportCategory({
				id: modalData.id,
			})
		).then((res) => {
			if (res.meta.requestStatus === "fulfilled") {
				SuccessToast(res.payload.message);
				setShowDeleteModal(false);
			} else {
				ErrorToast(res.payload.error.message);
			}
			setStatus(res.meta.requestId);
		});
	};

	return (
		<>
			<button
				onClick={() => setShowModal(!showModal)}
				className='btn-primary no-animation btn-sm btn  my-5 mr-2 w-fit'>
				Add Report Category
			</button>
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					{/* head */}
					<thead>
						<tr>
							<th>No</th>
							<th>Name</th>
							<th>Created At</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{reportCategories.map((item, index) => (
							<tr key={item.id}>
								<th>{index + 1}</th>
								<td>{item.name}</td>
								<td>{formatedHours(item.createdAt)}</td>
								<td>
									<div className='flex gap-5'>
										<button
											onClick={() => {
												setModalData(item);
												setReportName(item.name);
												setShowEditModal(!showEditModal);
											}}
											className='btn-warning no-animation btn w-fit capitalize text-white'>
											Edit
										</button>
										<button
											onClick={() => {
												setModalData(item);
												setShowDeleteModal(!showDeleteModal);
											}}
											className='btn-error no-animation btn w-fit capitalize text-white'>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{/* modal */}
			{showModal ? (
				<ReportCategoryModal
					showModal={showModal}
					setShowModal={setShowModal}
					reportCategory={reportName}
					setReportCategory={setReportName}
					handleOnConfirm={handleCreateReportCategory}
				/>
			) : null}
			{showEditModal ? (
				<ReportCategoryModal
					showModal={showEditModal}
					setShowModal={setShowEditModal}
					reportCategory={reportName}
					setReportCategory={setReportName}
					handleOnConfirm={handleEditReportCategory}
				/>
			) : null}
			{showDeleteModal ? (
				<DeleteModal
					setIsDelete={setShowDeleteModal}
					propName={modalData.name}
					handleOnConfirm={handleDeleteReportCategory}
				/>
			) : null}
		</>
	);
};

export default ReportCategories;
