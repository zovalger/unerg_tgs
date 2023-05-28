// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { loginUser_controller } from "@/controllers/auth.controller";
import connectDb from "@/lib/db";


export default async function handler(req, res) {
	await connectDb();

	console.log("login");

	if (req.method === "POST") return await loginUser_controller(req, res);
}
