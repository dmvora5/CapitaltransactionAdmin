import { baseQueryWithAuth } from "@/utils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
	baseQuery: baseQueryWithAuth,
	tagTypes: ["Category", "Licence", "Passport"],
	reducerPath: "/adminApi",
	endpoints: (build) => ({
		addCategory: build.mutation({
			query: (payload) => ({
				url: "admin/category",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["Category"],
		}),
		updateCategory: build.mutation({
			query: (payload) => ({
				url: `admin/category/${payload._id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Category", _id: arg._id },
			],
		}),
		deleteCategory: build.mutation({
			query: (payload) => ({
				url: `admin/category/${payload}`,
				method: "DELETE",
				body: payload,
			}),
			invalidatesTags: ["Category"],
		}),
		getCategory: build.query({
			query: (payload) => ({
				url: `admin/category/${payload}`,
			}),
			providesTags: (result, error, arg) => [
				{ type: "Category", _id: arg },
			],
		}),
		getAllcategory: build.query({
			query: (payload) => ({
				url: "category",
				params: payload,
			}),
			providesTags: (result, error, args) =>
				result?.data
					? [
							...(result?.data || []).map(({ _id }) => ({
								type: "Category",
								_id,
							})),
							"Category",
					  ]
					: ["Category"],
		}),

		//user docs
		updateLicenceStatus: build.mutation({
			query: (payload) => ({
				url: "admin/docs/licence",
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Licence", _id: arg._id },
			],
		}),
		updatePassportStatus: build.mutation({
			query: (payload) => ({
				url: "admin/docs/passport",
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Passport", _id: arg._id },
			],
		}),
		getAllDrivingLicence: build.query({
			query: (payload) => ({
				url: "admin/docs/licence",
				params: payload,
			}),
			providesTags: (result, error, args) =>
				result?.data
					? [
							...(result?.data || []).map(({ _id }) => ({
								type: "Licence",
								_id,
							})),
							"Licence",
					  ]
					: ["Licence"],
		}),
		getAllPassport: build.query({
			query: (payload) => ({
				url: "admin/docs/passport",
				params: payload,
			}),
			providesTags: (result, error, args) =>
				result?.data
					? [
							...(result?.data || []).map(({ _id }) => ({
								type: "Passport",
								_id,
							})),
							"Passport",
					  ]
					: ["Passport"],
		}),
		getDrivingLicenece: build.query({
			query: (payload) => ({
				url: `admin/docs/licence/${payload}`,
			}),
			providesTags: (result, error, arg) => [
				{ type: "Licence", _id: arg },
			],
		}),
		getPassport: build.query({
			query: (payload) => ({
				url: `admin/docs/passport/${payload}`,
			}),
			providesTags: (result, error, arg) => [
				{ type: "Passport", _id: arg },
			],
		}),
	}),
});

export const {
	useAddCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
	useGetAllcategoryQuery,
	useGetCategoryQuery,

	//user docs
	useUpdateLicenceStatusMutation,
	useUpdatePassportStatusMutation,
	useGetAllDrivingLicenceQuery,
	useGetAllPassportQuery,
	useGetDrivingLiceneceQuery,
	useGetPassportQuery,
} = adminApi;
