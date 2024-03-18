import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import EventBus from "./event";

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
	baseUrl: process.env.API_URL,
	credentials: "include",
});

export const baseQueryWithAuth = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();
	let result = await baseQuery(args, api, extraOptions);
	switch (result.error?.data?.status) {
		case 403:
			if (!mutex.isLocked()) {
				const release = await mutex.acquire();
				try {
					const refreshResult = await baseQuery(
						{ url: "auth/refresh" },
						api,
						extraOptions
					);
					console.log("result", result);
					console.log("refreshResult", refreshResult);

					if (refreshResult.data) {
						result = await baseQuery(args, api, extraOptions);
					} else {
						// if (refreshResult.error?.data?.status === 401) {
						// 	EventBus.dispatch("logout");
						// }
						EventBus.dispatch("logout");
						//dispatch logout after
					}
				} finally {
					release();
				}
			} else {
				await mutex.waitForUnlock();
				result = await baseQuery(args, api, extraOptions);
			}
			break;
		case 401:
			EventBus.dispatch("logout");
			break;
		default:
			break;
	}

	return result;
};
