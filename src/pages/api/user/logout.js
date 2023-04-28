// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "@/lib/db";

import {  logoutUser_controller } from "@/controllers/user.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST") return await logoutUser_controller(req, res);
}
