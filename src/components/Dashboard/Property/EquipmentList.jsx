import EllipsisPagination from "@/components/Shared/EllipsisPagination";
import Search from "@/components/Shared/Search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { limit } from "@/constant";
import { PATH } from "@/path";
import { useGetAllEquipmentQuery } from "@/redux/api/adminApi";
import moment from "moment";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState } from "react";

const Loader = dynamic(() => import("@/components/Shared/Loader"), {
	ssr: false,
});
const EquipmentList = () => {
	const [page, setPage] = useState(1);
	const [search, setSearch] = useState();

	const { data, isLoading, isSuccess, error, isError } =
		useGetAllEquipmentQuery({ page, limit: limit, search });

	return (
		<>
			{/* <APICallStatushandler
				options={{ data, isLoading, isSuccess, error, isError }}
			/> */}
			{isLoading && <Loader />}
			<h2 className="font-medium text-3xl text-[#333333]">
				Equipment List
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
									Vehical Id No.
								</th>
								<th scope="col" className="py-3 px-6 border">
									Title
								</th>
								<th scope="col" className="py-3 px-6 border">
									Make Year
								</th>
								<th scope="col" className="py-3 px-6 border">
									Fuel
								</th>
								<th scope="col" className="py-3 px-6 border">
									PriorTitleNo
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
										{item.vehicalIdetificationNo}
									</td>
									<td className="py-2 px-6 border">
										{item.titleNo}
									</td>
									<td className="py-2 px-6 border">
										{moment(item?.year).format("L")}
									</td>
									<td className="py-2 px-6 border">
										{item.Fuel}
									</td>
									<td className="py-2 px-6 border">
										{item.PriorTitleNo}
									</td>

									<td className="py-2 flex justify-center gap-x-4 items-center px-2 border">
										<Button variant="outline" size="sm">
											<Link
												href={`${PATH.userEquipment}${item._id}`}
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
					{data?.count > limit && (
						<div className="my-6 flex justify-center">
							<EllipsisPagination
								count={data?.count || 0}
								limit={limit}
								currentPage={page}
								handlePageChange={setPage}
							/>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default EquipmentList;
