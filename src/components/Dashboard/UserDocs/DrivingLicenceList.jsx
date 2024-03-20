// import APICallStatushandler from "@/components/Shared/APICallStatushandler";
import EllipsisPagination from "@/components/Shared/EllipsisPagination";
import Search from "@/components/Shared/Search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { limit } from "@/constant";
import { PATH } from "@/path";
import { useGetAllDrivingLicenceQuery } from "@/redux/api/adminApi";
import Link from "next/link";
import React, { useState } from "react";
import moment from "moment";
import dynamic from "next/dynamic";

const Loader = dynamic(() => import("@/components/Shared/Loader"), {
	ssr: false,
});

const DrivingLicenceList = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState();

	const { data, isLoading, isSuccess, error, isError } =
		useGetAllDrivingLicenceQuery({ page, limit: limit, search });

	return (
		<>
			{/* <APICallStatushandler
				options={{ data, isLoading, isSuccess, error, isError }}
			/> */}
			{isLoading && <Loader />}
			<h2 className="font-medium text-3xl text-[#333333]">
				Driving Licenece List
			</h2>
			<div className="bg-white space-y-4 p-6 mt-8">
				<Search
					setValue={(e) => {
						setPage(1);
						setSearch(e);
					}}
				/>
				<div className="overflow-x-auto relative shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
						<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
							<tr>
								<th scope="col" className="py-3 px-6 border">
									No.
								</th>
								<th scope="col" className="py-3 px-6 border">
									Full Name
								</th>
								<th scope="col" className="py-3 px-6 border">
									Customer Id
								</th>
								<th scope="col" className="py-3 px-6 border">
									Dob
								</th>
								<th scope="col" className="py-3 px-6 border">
									Gender
								</th>
								<th scope="col" className="py-3 px-6 border">
									Address
								</th>
								<th scope="col" className="py-3 px-6 border">
									Action
								</th>
							</tr>
						</thead>
						<tbody>
							{(data?.data || []).map((item, index) => (
								<tr
									key={item.id}
									className="bg-white dark:bg-gray-800"
								>
									<td className="py-2 px-6 border">
										{(page - 1) * limit + (index + 1)}
									</td>
									<td className="py-2 px-6 border">
										{item.fullName}
									</td>
									<td className="py-2 px-6 border">
										{item.customerId}
									</td>
									<td className="py-2 px-6 border">
										{moment(item.dob).format("L")}
									</td>
									<td className="py-2 px-6 border">
										{item.gender}
									</td>
									<td className="py-2 px-6 border">
										{item.address?.slice(0, 20)}...
									</td>

									<td className="py-2 flex justify-center gap-x-4 items-center px-2 border">
										<Button variant="outline" size="sm">
											<Link
												href={`${PATH.userDocsLicence}${item._id}`}
												variant="outline"
												size="sm"
											>
												View
											</Link>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<div className="my-6 flex justify-center">
						{data?.count > limit && (
							<EllipsisPagination
								count={data?.count || 0}
								limit={limit}
								currentPage={page}
								handlePageChange={setPage}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default DrivingLicenceList;
