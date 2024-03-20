import { useRouter } from "next/router";
import APICallStatushandler from "@/components/Shared/APICallStatushandler";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import moment from "moment";
import {
	useGetRealEstateQuery,
	useUpdateRealEstateStatusMutation,
} from "@/redux/api/adminApi";

const Loader = dynamic(() => import("@/components/Shared/Loader"), {
	ssr: false,
});
const RealEstateDetails = () => {
	const router = useRouter();

	const { data, isLoading, isSuccess, isError, error } =
		useGetRealEstateQuery(router.query.id, {
			skip: !router.query.id,
		});
	const [submit, statusOption] = useUpdateRealEstateStatusMutation();

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
						<p className="w-1/6">Location</p>
						<p className="flex-1">
							{data?.data?.location?.coordinates?.join(",")}
						</p>
					</div>
					<div className="flex px-4 py-2">
						<p className="w-1/6">Address</p>
						<p className="flex-1">{data?.data?.address}</p>
					</div>
					<div className="flex px-4 py-2">
						<p className="w-1/6">Property Address :</p>
						<p className="flex-1">{data?.data?.propertyAddress}</p>
					</div>
					<div className="flex px-4 py-2">
						<p className="w-1/6">Email :</p>
						<p className="flex-1">{data?.data?.email}</p>
					</div>
				</div>
			</div>
			<div className="flex gap-x-4">
				<img src={data?.data?.images[0]?.url} className="h-52" />
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

export default RealEstateDetails;
