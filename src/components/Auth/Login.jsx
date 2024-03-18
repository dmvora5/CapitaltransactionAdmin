import { useLoginMutation } from "@/redux/api/auth";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import Cookies from "js-cookie";
import { redirect_after_login } from "@/path";
import APICallStatushandler from "../Shared/APICallStatushandler";
import Loader from "../Shared/Loader";

const Login = () => {
	const router = useRouter();

	const [login, loginOptions] = useLoginMutation();

	const formSchema = z.object({
		email: z
			.string({
				required_error: "please enter a valid email",
			})
			.email("please enter valid email address"),
		password: z.string().min(2, "password at least 2 characters. long"),
	});

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const afterLoginHandler = (data) => {
		Cookies.set("user", JSON.stringify(data.data));
		router.push(redirect_after_login);
	};
	return (
		<>
			{loginOptions.isLoading && <Loader />}
			<APICallStatushandler
				cb={afterLoginHandler}
				options={loginOptions}
			/>
			<div className="text-white space-y-10 sm:w-11/12">
				<h2 className="font-medium text-xl">SignIn to Your Account</h2>
				<Form {...form}>
					<form
						className="space-y-8"
						onSubmit={form.handleSubmit(login)}
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="min-h-[70px]">
									{/* <FormLabel>Email</FormLabel> */}
									<FormControl>
										<Input
											type="email"
											className="bg-transparent pl-0 rounded-none placeholder:text-white border-t-0 border-x-0 border-b-2 outline-none "
											placeholder="Email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="min-h-[70px]">
									{/* <FormLabel>Password</FormLabel> */}
									<FormControl>
										<Input
											type="password"
											className="bg-transparent pl-0 rounded-none placeholder:text-white border-t-0 border-x-0 border-b-2 outline-none "
											placeholder="Password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="flex justify-between items-center">
							<Button
								className="bg-white text-black w-40"
								type="submit"
							>
								Login
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</>
	);
};

export default Login;
