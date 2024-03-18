import {
	useGetCategoryQuery,
	useGetDrivingLiceneceQuery,
	useUpdateCategoryMutation,
	useUpdateLicenceStatusMutation,
} from "@/redux/api/adminApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import APICallStatushandler from "@/components/Shared/APICallStatushandler";

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";
import { PATH } from "@/path";
import moment from "moment";

const Loader = dynamic(() => import("@/components/Shared/Loader"), {
	ssr: false,
});

const LicenceDetails = () => {
	const router = useRouter();

	const { data, isLoading, isSuccess, isError, error } =
		useGetDrivingLiceneceQuery(router.query.id, {
			skip: !router.query.id,
		});
	const [submit, statusOption] = useUpdateLicenceStatusMutation();

	const updateStatus = () => {
		submit({
			id: router.query.id,
			status: true,
		});
	};

	const handleRedirect = () => {};

	return (
		<>
			{isLoading && <Loader />}
			<APICallStatushandler options={statusOption} cb={handleRedirect} />
			<div className="flex bg-white mt-8 justify-between h-52">
				<div className="sm:w-1/2 space-y-2 flex-1 h-52">
					<div className="flex px-4 py-2">
						<p className="w-1/6">Full Name :</p>
						<p className="flex-1">{data?.data?.fullName}</p>
					</div>
					<div className="flex px-4 py-2">
						<p className="w-1/6">Customer Id :</p>
						<p className="flex-1">{data?.data?.customerId}</p>
					</div>
					<div className="flex px-4 py-2">
						<p className="w-1/6">Dob :</p>
						<p className="flex-1">
							{moment(data?.data?.dob).format("L")}
						</p>
					</div>
					<div className="flex px-4 py-2">
						<p className="w-1/6">Address :</p>
						<p className="flex-1">{data?.data?.address}</p>
					</div>
				</div>
				<div className="h-52">
					<img src={data?.data?.frontImage} className="h-full" />
				</div>
			</div>
			<div className="p-5 text-center">
				<Button
					disabled={statusOption.isLoading || data?.data?.verifyed}
					onClick={updateStatus}
					className="bg-theamP"
				>
					Verify
				</Button>
			</div>
		</>
	);
};

export default LicenceDetails;
