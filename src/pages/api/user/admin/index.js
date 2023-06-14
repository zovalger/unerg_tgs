import { getAllUserAdmins_controller } from "@/controllers/userAdmin.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "GET") return await getAllUserAdmins_controller(req, res);
}
