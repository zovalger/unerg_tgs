// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { profileUser_controller } from "@/controllers/auth.controller";
import connectDb from "@/lib/db";


export default async function handler(req, res) {
	await connectDb();

	console.log("profile");
	if (req.method === "POST") return await profileUser_controller(req, res);
}
