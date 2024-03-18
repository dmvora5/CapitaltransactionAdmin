import { baseQuery } from "@/utils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
	baseQuery: baseQuery,
	tagTypes: ["Auth"],
	endpoints: (build) => ({
		login: build.mutation({
			query: (payload) => ({
				url: "admin/auth/login",
				method: "POST",
				body: payload,
			}),
		}),
	}),
});

export const { useLoginMutation } = authApi;
