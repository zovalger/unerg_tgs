// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { logoutUser_controller } from "@/controllers/auth.controller";
import connectDb from "@/lib/db";


export default async function handler(req, res) {
	await connectDb();
	console.log("logout");

	if (req.method === "POST") return await logoutUser_controller(req, res);
}
