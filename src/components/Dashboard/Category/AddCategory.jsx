import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import APICallStatushandler from "@/components/Shared/APICallStatushandler";
import Loader from "@/components/Shared/Loader";

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
import { useAddCategoryMutation } from "@/redux/api/adminApi";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../ui/select";

const formSchema = z.object({
	type: z.string().min(2, "type must be at least 2 characters"),
	name: z.string().min(2, "name must be at least 2 characters"),
	value: z.string().min(2, "value must be at least 2 characters"),
});

const AddCategory = () => {
	const [submit, addCategoryOption] = useAddCategoryMutation();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			type: "Equipment",
		},
	});

	const afterAddHandler = () => {};

	return (
		<>
			{addCategoryOption.isLoading && <Loader />}
			<h2 className="font-medium text-3xl text-[#333333]">Category</h2>
			<APICallStatushandler
				options={addCategoryOption}
				cb={afterAddHandler}
			/>
			<Form {...form} className="">
				<form
					onSubmit={form.handleSubmit(submit)}
					className="space-y-6 mt-8 sm:p-8 p-4 bg-white rounded-lg"
				>
					<div className="flex flex-col lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="type"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="font-normal">
											Type
										</FormLabel>
										<Select
											className="focus:outline-none border border-[#acacac] rounded-[10px]"
											onValueChange={field.onChange}
											value={field.value}
										>
											<FormControl className="h-14 border-[#acacac] rounded-[10px]">
												<SelectTrigger>
													<SelectValue placeholder="Select Gender" />
												</SelectTrigger>
											</FormControl>
											<SelectContent className="">
												<SelectItem value="Equipment">
													Equipment
												</SelectItem>
												<SelectItem value="RealEstate">
													Real Estate
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											Enter Category name
										</FormLabel>
										<FormControl>
											<Input
												className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
												placeholder="Enter category full name..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="flex flex-col lg:flex-row gap-x-5 space-y-2 md:space-y-0">
						<div className="flex-1 min-h-[116px]">
							<FormField
								control={form.control}
								name="value"
								render={({ field }) => (
									<FormItem className="min-h-[70px]">
										<FormLabel className="font-normal">
											value
										</FormLabel>
										<FormControl>
											<Input
												className="h-14 focus:outline-none border border-[#acacac] rounded-[10px]"
												placeholder="Enter category value..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="text-center py-5">
						<Button className="px-10 mx-auto bg-theamP w-full lg:w-fit">
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

export default AddCategory;
