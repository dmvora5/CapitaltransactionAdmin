import { cn } from "@/lib/utils";
import { authRoutes, withoutLayoutRoutes } from "@/path";
import {
	Bell,
	BookUser,
	Building,
	CreditCard,
	FileTerminal,
	LayoutDashboard,
	MenuIcon,
	MessageSquare,
	NotebookPen,
	Scroll,
	Search,
	Settings,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";

const Menu = [
	{
		name: "Category",
		Icon: LayoutDashboard,
		path: "/dashboard/category",
		subRoute: [
			{
				name: "Add Category",
				Icon: LayoutDashboard,
				path: "/dashboard/category",
			},
			{
				name: "List Category",
				Icon: LayoutDashboard,
				path: "/dashboard/category/list",
			},
		],
	},
	{
		name: "User Docs",
		Icon: LayoutDashboard,
		path: "/dashboard/userdocs",
		subRoute: [
			{
				name: "List Licence",
				Icon: LayoutDashboard,
				path: "/dashboard/userdocs/drivinglicence",
			},
			{
				name: "List Passport",
				Icon: LayoutDashboard,
				path: "/dashboard/userdocs/passport",
			},
		],
	},
];

const Layout = ({ children }) => {
	const router = useRouter();

	const [show, setShow] = useState(true);
	const [itemShow, setItemShow] = useState(true);

	const [currentMenu, setCurrentMenu] = useState("");

	const handleShow = () => {
		setShow(!show);
		setTimeout(() => {
			setItemShow(!itemShow);
		}, 100);
	};

	if (
		authRoutes.includes(router.pathname) ||
		withoutLayoutRoutes.includes(router.pathname)
	) {
		return children;
	}

	const Notification = ({ isMobile }) => {
		return (
			<Popover>
				<PopoverTrigger asChild>
					<span className="relative mx-auto cursor-pointer">
						<Badge className="absolute right-0 top-[-4px] w-4 h-4 p-1 bg-theamP">
							8
						</Badge>
						<Bell className="w-8 h-8" />
					</span>
				</PopoverTrigger>
				<PopoverContent
					className="w-[400px] p-0"
					align={isMobile ? "center" : "end"}
				>
					<div className="p-4 flex border-b">
						<h2 className="flex-1 font-medium text-xl">
							Notification
						</h2>
						<Button size="sm" className="px-2 bg-theamP">
							3 unread
						</Button>
					</div>
					<div className="p-2 flex items-center border-b h-24">
						<div className="w-1/6">
							<img
								src="/images/notification.svg"
								className="w-full h-full"
							/>
						</div>
						<div className="flex-1 p-1">
							<h2 className="text-lg flex justify-between mr-2">
								<span>Account Has Been Verified</span>
								<img src="/images/check.svg" />
							</h2>
							<p className="text-sm">
								Your Account Has Been Verified Sucessfully
							</p>
						</div>
					</div>
					<div className="p-2 flex items-center border-b h-24">
						<div className="w-1/6">
							<img
								src="/images/notification.svg"
								className="w-full h-full"
							/>
						</div>
						<div className="flex-1 p-1">
							<h2 className="text-lg flex justify-between mr-2">
								<span>Account Has Been Verified</span>
								<img src="/images/check.svg" />
							</h2>
							<p className="text-sm">
								Your Account Has Been Verified Sucessfully
							</p>
						</div>
					</div>
					<div className="p-2 flex items-center border-b h-24">
						<div className="w-1/6">
							<img
								src="/images/notification.svg"
								className="w-full h-full"
							/>
						</div>
						<div className="flex-1 p-1">
							<h2 className="text-lg flex justify-between mr-2">
								<span>Account Has Been Verified</span>
								<img src="/images/check.svg" />
							</h2>
							<p className="text-sm">
								Your Account Has Been Verified Sucessfully
							</p>
						</div>
					</div>
					<div className="p-2 flex items-center border-b h-24">
						<div className="w-1/6">
							<img
								src="/images/notification.svg"
								className="w-full h-full"
							/>
						</div>
						<div className="flex-1 p-1">
							<h2 className="text-lg flex justify-between mr-2">
								<span>Account Has Been Verified</span>
								<img src="/images/check.svg" />
							</h2>
							<p className="text-sm">
								Your Account Has Been Verified Sucessfully
							</p>
						</div>
					</div>
					<div className="p-2 flex items-center border-b h-24">
						<div className="w-1/6">
							<img
								src="/images/notification.svg"
								className="w-full h-full"
							/>
						</div>
						<div className="flex-1 p-1">
							<h2 className="text-lg flex justify-between mr-2">
								<span>Account Has Been Verified</span>
								<img src="/images/check.svg" />
							</h2>
							<p className="text-sm">
								Your Account Has Been Verified Sucessfully
							</p>
						</div>
					</div>
					<div className="h-28 py-10 px-6">
						<Button className="w-full h-12 bg-theamP">
							View All
						</Button>
					</div>
				</PopoverContent>
			</Popover>
		);
	};

	const BackSection = ({ classNames = "", isMobile = false }) => {
		return (
			<div className={cn("flex items-center", classNames)}>
				<MessageSquare className="w-8 h-8 mx-auto" />
				{/* <Notification isMobile={isMobile} /> */}
				<div className={cn("flex justify-evenly w-1/2 mx-auto")}>
					<Avatar>
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt="@shadcn"
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>

					<div className="text-sm hidden lg:block">
						<p>User Name</p>
						<p>User</p>
					</div>

					<MenuIcon className="h-8 w-8 lg:hidden" />
				</div>
			</div>
		);
	};

	const SearchSection = ({ classNames }) => {
		return (
			<div
				className={cn(
					"flex items-center border border-[#acacac] rounded-[10px]",
					classNames
				)}
			>
				<Search className="w-6 mx-4 text-[#acacac]" />
				<input
					className="h-[40px] outline-none mr-2"
					placeholder="Search"
				/>
			</div>
		);
	};

	return (
		<div className="flex flex-col md:flex-row min-h-screen">
			<header className={cn("container h-[135px] md:hidden py-4 px-3")}>
				<div className="flex h-1/2 items-center">
					<h2 className="w-1/2 font-bold text-theamP">
						Capital Transactions
					</h2>
					{/* <BackSection classNames="w-1/2" isMobile={true} /> */}
				</div>
				{/* <SearchSection /> */}
			</header>
			<aside
				className={cn(
					"bg-slate-50 space-y-10 transition-all hidden md:block",
					show ? "w-64" : "w-20"
				)}
			>
				<div
					className={cn(
						"transition-all h-[80px] font-semibold text-xl p-5 text-theamP"
					)}
				>
					<span
						className={cn(
							"transition-all",
							show && itemShow ? "" : "hidden"
						)}
					>
						Capital Transactions
					</span>
				</div>
				<div>
					<div className="">
						<h2 className="p-4">
							<span
								className={
									("transition-all",
									cn(show && itemShow ? "" : "hidden"))
								}
							>
								MAIN MENU
							</span>
						</h2>
					</div>

					{Menu.map(({ name: parentName, Icon, path, subRoute }) => (
						<div
							key={path}
							onClick={() => setCurrentMenu(parentName)}
						>
							<div
								className={cn(
									"py-5 text-sm flex cursor-pointer",
									currentMenu === parentName
										? "bg-white shadow-lg text-theamP"
										: " text-[#333333]"
								)}
							>
								<Icon
									className={cn(
										show && itemShow ? "mx-4" : "mx-7"
									)}
								/>
								<h2
									className={cn(
										show && itemShow ? "" : "hidden"
									)}
								>
									{parentName}
								</h2>
							</div>
							{subRoute.map(({ name, Icon, path }) => (
								<div
									key={path}
									className={cn(
										"p-5 shadow-sm transition-all",
										currentMenu === parentName ||
											subRoute
												.map((ele) => ele.path)
												.includes(router.pathname)
											? "block"
											: "hidden",
										path === router.pathname
											? "bg-white shadow-inner text-theamP"
											: " text-[#333333]"
									)}
								>
									<Link href={path}>
										<div className="flex">
											<Icon
												className={cn(
													show && itemShow
														? "mx-4"
														: "mx-7"
												)}
											/>
											<h2
												className={cn(
													show && itemShow
														? ""
														: "hidden"
												)}
											>
												{name}
											</h2>
										</div>
									</Link>
								</div>
							))}
						</div>
					))}
				</div>
			</aside>
			<section className="flex-1 min-h-full flex flex-col">
				<div className="h-[80px] items-center hidden md:flex  justify-between">
					<div className="w-1/4 flex">
						<MenuIcon
							onClick={handleShow}
							className="h-[40px] text-[#acacac] w-[100px] cursor-pointer"
						/>
						{/* <SearchSection /> */}
					</div>
					{/* <BackSection classNames="sm:w-[30%] md:w-1/2 xl:w-1/5 " /> */}
				</div>
				<div className="bg-[#acacac34] flex-1 p-4 sm:p-7">
					{children}
				</div>
			</section>
		</div>
	);
};

export default Layout;
