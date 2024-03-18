import EventBus from "@/utils/event";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AuthGard = ({ children }) => {
	const router = useRouter();

	useEffect(() => {
		EventBus.on("logout", () => {
			router.replace("/login");
		});

		return () => EventBus.remove("logout");
	}, []);
	return children;
};

export default AuthGard;
