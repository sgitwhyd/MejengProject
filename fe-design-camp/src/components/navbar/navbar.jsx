import { useState } from "react";
import logo from "@/assets/mejeng.webp";
import Image from "next/image";
import Link from "next/link";
import { CgProfile, CgLogOff } from "react-icons/cg";
import { RiUserSettingsLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth } from "@/store/auth/auth.selector";
import { selectUser } from "@/store/user/user.selector";
import { authLogout } from "@/store/auth/auth.reducer";
import { userLogout } from "@/store/user/user.reducer";
import { adminLogout } from "@/store/admin/admin.reducer";
import { SuccessToast } from "../toast/alert-taost";
import Router from "next/router";

export default function Navbar() {
	const dispatch = useDispatch();
	const router = Router;
	const { login } = useSelector(selectAuth);
	const { user } = useSelector(selectUser);
	const [isHover, setIsHover] = useState(false);

	const handleOnMouseEnter = () => {
		setIsHover(true);
	};

	const handleOnMouseLeave = () => {
		setIsHover(false);
	};

	const handleLogout = () => {
		router.push("/");
		setTimeout(() => {
			Promise.all([
				dispatch(authLogout()),
				dispatch(userLogout()),
				dispatch(adminLogout()),
			]);
			SuccessToast("Logout Success");
		}, 2000);
	};

	return (
		<nav className=' absolute w-full shadow-md'>
			<div className='mx-auto flex h-20 max-w-screen-2xl items-center justify-between px-[47px]'>
				<div className='flex items-center justify-center gap-12 font-medium'>
					<Link href='/'>
						<Image src={logo} alt='logo' height={30} />
					</Link>
					<Link href='/project/inspirations'>Inspirations</Link>
					<Link href='/project/discover'>Discover</Link>
				</div>
				<div className='flex items-center justify-center gap-11'>
					{login ? (
						<div className='relative'>
							<div
								className='avatar flex cursor-pointer items-center gap-2 py-2 px-3'
								onMouseEnter={handleOnMouseEnter}
								onMouseLeave={handleOnMouseLeave}>
								<p
									className='w-[150px] truncate text-right font-semibold'
									title={user?.name}>
									{user?.name}
								</p>
								<div className='w-8 rounded-full'>
									<img
										src={
											user?.profile_image?.includes("avatars")
												? user?.profile_image
												: `${process.env.NEXT_PUBLIC_BE_BASE_URL}/${user?.profile_image}`
										}
									/>
								</div>
							</div>
							{isHover && (
								<div
									className='absolute right-0 z-50 flex -translate-x-2 flex-col items-start justify-center gap-4 rounded-lg bg-white px-5 pt-7 pb-5 drop-shadow-xl'
									onMouseEnter={() => {
										setIsHover(true);
									}}
									onMouseLeave={() => {
										setIsHover(false);
									}}>
									{user?.role.toLowerCase() === "admin" ? (
										<Link
											href='/admin'
											className='flex items-center gap-2 font-medium text-gray-600 transition-all hover:text-primary'>
											<RiUserSettingsLine size={20} />
											<h3>Dashboard</h3>
										</Link>
									) : (
										<>
											<Link
												href='/user/profile'
												className='flex items-center gap-2 font-medium text-gray-600 transition-all hover:text-primary'>
												<CgProfile size={20} />
												<h3>My Profile</h3>
											</Link>
											{user?.is_verify && (
												<Link
													href='/user/upload-project'
													className='flex items-center gap-2 font-medium text-gray-600 transition-all hover:text-primary'>
													<FiUpload size={20} />
													<h3>Upload Project</h3>
												</Link>
											)}
										</>
									)}
									<button
										onClick={handleLogout}
										className='flex w-full items-center gap-2 border-t-2 pt-3 font-medium text-gray-600 transition-all hover:text-primary '>
										<CgLogOff size={20} />
										<h3>Logout</h3>
									</button>
								</div>
							)}
						</div>
					) : (
						<div className='flex items-center justify-center gap-3 '>
							<Link
								href={"/auth/login"}
								className='rounded-[15px] py-[14px] px-8 font-bold text-primary transition-all hover:bg-primary hover:text-white hover:shadow-primary/40 hover:drop-shadow-lg'>
								Login
							</Link>
							<Link
								href={"/auth/register"}
								className='rounded-[15px] bg-primary py-[14px] px-8 font-bold text-white hover:text-white'>
								Register
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
}
