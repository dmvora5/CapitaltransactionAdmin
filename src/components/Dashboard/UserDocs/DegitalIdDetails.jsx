import APICallStatushandler from "@/components/Shared/APICallStatushandler";
import { Button } from "@/components/ui/button";
import {
	useGetDigitalIdQuery,
	useUpdateDigitalIdStatusMutation,
} from "@/redux/api/adminApi";
import { useRouter } from "next/router";

const Loader = dynamic(() => import("@/components/Shared/Loader"), {
	ssr: false,
});

const DegitalIdDetails = () => {
	const router = useRouter();

	const { data, isLoading, isSuccess, isError, error } = useGetDigitalIdQuery(
		router.query.id,
		{
			skip: !router.query.id,
		}
	);
	const [submit, statusOption] = useUpdateDigitalIdStatusMutation();

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
						<p className="w-1/6">Card No :</p>
						<p className="flex-1">{data?.data?.cardNo}</p>
					</div>
					<div className="flex px-4 py-2">
						<p className="w-1/6">Email :</p>
						<p className="flex-1">{data?.data?.email}</p>
					</div>
					<div className="flex px-4 py-2">
						<p className="w-1/6">Phone No :</p>
						<p className="flex-1">{data?.data?.phoneNo}</p>
					</div>
					<div className="flex px-4 py-2">
						<p className="w-1/6">Country :</p>
						<p className="flex-1">{data?.data?.country}</p>
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

export default DegitalIdDetails;
