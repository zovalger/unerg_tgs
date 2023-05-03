import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { AUTH_DISABLE, SECRET_WORD } from "./config";

export async function middleware(request) {

	
	console.log(AUTH_DISABLE);


	if (AUTH_DISABLE) return NextResponse.next();

	const jwt = request.cookies.get("authCookie");

	if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

	try {
		const { payload } = await jwtVerify(
			jwt.value,
			new TextEncoder().encode(SECRET_WORD)
		);
		console.log(payload);
		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

export const config = {
	matcher: ["/api/waypoint/:path*", "/admin/:path*", "/driver/:path*"],
};
