import APICallStatushandler from "@/components/Shared/APICallStatushandler";
import Loader from "@/components/Shared/Loader";
import { Button } from "@/components/ui/button";
import {
	useGetPassportQuery,
	useUpdatePassportStatusMutation,
} from "@/redux/api/adminApi";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

const PassportDetails = () => {
	const router = useRouter();

	const { data, isLoading, isSuccess, isError, error } = useGetPassportQuery(
		router.query.id,
		{
			skip: !router.query.id,
		}
	);
	const [submit, statusOption] = useUpdatePassportStatusMutation();

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
						<p className="w-1/6">Nationality :</p>
						<p className="flex-1">{data?.data?.nationality}</p>
					</div>
					<div className="flex px-4 py-2">
						<p className="w-1/6">Dob :</p>
						<p className="flex-1">
							{moment(data?.data?.dob).format("L")}
						</p>
					</div>
					<div className="flex px-4 py-2">
						<p className="w-1/6">Passport No :</p>
						<p className="flex-1">{data?.data?.passportNo}</p>
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

export default PassportDetails;
