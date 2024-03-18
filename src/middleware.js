import { NextResponse } from "next/server";
import {
	PATH,
	authRoutes,
	protectedRoutes,
	redirect_after_login,
} from "./path";

export function middleware(request) {
	const user = request.cookies.get("user")?.value;

	if (
		protectedRoutes.includes(request.nextUrl.pathname) &&
		(!user || Date.now() > JSON.parse(user).expireAt)
	) {
		request.cookies.delete("user");
		const response = NextResponse.redirect(
			new URL(PATH.login, request.url)
		);
		response.cookies.delete("user");

		return response;
	}

	if (authRoutes.includes(request.nextUrl.pathname) && user) {
		const response = NextResponse.redirect(
			new URL(redirect_after_login, request.url)
		);
		return response;
	}
}
