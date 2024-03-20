import { baseQueryWithAuth } from "@/utils";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
	baseQuery: baseQueryWithAuth,
	tagTypes: [
		"Category",
		"Licence",
		"Passport",
		"RealEstate",
		"Equipment",
		"DigitalId",
	],
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

		//property
		getAllRealEstate: build.query({
			query: (payload) => ({
				url: "admin/property/realestate",
				params: payload,
			}),
			providesTags: (result, error, args) =>
				result?.data
					? [
							...(result?.data || []).map(({ _id }) => ({
								type: "RealEstate",
								_id,
							})),
							"RealEstate",
					  ]
					: ["RealEstate"],
		}),
		getRealEstate: build.query({
			query: (payload) => ({
				url: `property/realestate/${payload}`,
			}),
			providesTags: (result, error, arg) => [
				{ type: "RealEstate", _id: arg },
			],
		}),
		updateRealEstateStatus: build.mutation({
			query: (payload) => ({
				url: "admin/property/realestate",
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "RealEstate", _id: arg._id },
			],
		}),

		getAllEquipment: build.query({
			query: (payload) => ({
				url: "admin/property/equipment",
				params: payload,
			}),
			providesTags: (result, error, args) =>
				result?.data
					? [
							...(result?.data || []).map(({ _id }) => ({
								type: "Equipment",
								_id,
							})),
							"Equipment",
					  ]
					: ["Equipment"],
		}),
		getEquipment: build.query({
			query: (payload) => ({
				url: `property/equipment/${payload}`,
			}),
			providesTags: (result, error, arg) => [
				{ type: "Equipment", _id: arg },
			],
		}),
		updateEquipmentStatus: build.mutation({
			query: (payload) => ({
				url: "admin/property/equipment",
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "Equipment", _id: arg._id },
			],
		}),

		//digital id
		getAllDigitalId: build.query({
			query: (payload) => ({
				url: "admin/docs/digitalId",
				params: payload,
			}),
			providesTags: (result, error, args) =>
				result?.data
					? [
							...(result?.data || []).map(({ _id }) => ({
								type: "DigitalId",
								_id,
							})),
							"DigitalId",
					  ]
					: ["DigitalId"],
		}),
		getDigitalId: build.query({
			query: (payload) => ({
				url: `admin/docs/digitalId/${payload}`,
			}),
			providesTags: (result, error, arg) => [
				{ type: "DigitalId", _id: arg },
			],
		}),
		updateDigitalIdStatus: build.mutation({
			query: (payload) => ({
				url: "admin/docs/digitalId",
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: (result, error, arg) => [
				{ type: "DigitalId", _id: arg._id },
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

	//property
	useGetAllRealEstateQuery,
	useGetRealEstateQuery,
	useUpdateRealEstateStatusMutation,

	useGetAllEquipmentQuery,
	useGetEquipmentQuery,
	useUpdateEquipmentStatusMutation,

	//digitalId
	useGetAllDigitalIdQuery,
	useGetDigitalIdQuery,
	useUpdateDigitalIdStatusMutation,
} = adminApi;
