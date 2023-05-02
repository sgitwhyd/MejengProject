import React from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import { plusJakartaSans } from "@/utils/font";

import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCategories } from "@/store/categories/categories.action";
import { fetchTools } from "@/store/tools/tools.action";
import { getIpAddress } from "@/store/user/user.action";
import { fetchReportCategory } from "@/store/report/report.action";

export default function LayoutAdmin({ children }) {
	const dispatch = useDispatch();

	useEffect(() => {
		Promise.all([
			dispatch(fetchCategories()),
			dispatch(fetchTools()),
			dispatch(getIpAddress()),
			dispatch(fetchReportCategory()),
		]);
	}, []);
	return (
		<>
			<Navbar />
			<main
				className={`mx-auto max-w-screen-2xl px-[47px] py-40 ${plusJakartaSans.className}`}>
				{children}
			</main>
			<Footer />
		</>
	);
}
