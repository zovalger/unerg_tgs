import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
	const jwt = request.cookies.get("authCookie");

	if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

	try {
		const { payload } = await jwtVerify(
			jwt.value,
			new TextEncoder().encode(process.env.SECRET_WORD)
		);
		console.log(payload);
		return NextResponse.next();
	} catch (error) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
}

// export const config = {
// 	matcher: ["/api/hero/:path*", "/api/folder/:path*"],
// };
