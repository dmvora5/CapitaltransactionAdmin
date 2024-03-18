/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import toast from "react-hot-toast";

const APICallStatushandler = ({ cb, errorCb, options }) => {
	const { isSuccess, isLoading, isError, error, data } = options;
	useEffect(() => {
		if (isSuccess && data) {
			if (data.success) {
				data?.message && toast.success(data?.message);
				if (typeof cb === "function") cb(data);
			}
		}

		if (error) {
			error.data?.message && toast.error(error.data?.message);
			if (typeof errorCb === "function") errorCb(error.data?.message);
		}
	}, [data, isSuccess, error]);

	return null;
};

export default APICallStatushandler;
