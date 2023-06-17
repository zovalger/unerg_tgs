import { getUserAdmin_by_Id_controller, updateUserAdmin_controller } from "@/controllers/userAdmin.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "PUT") return await updateUserAdmin_controller(req, res);
	if (req.method === "GET") return await getUserAdmin_by_Id_controller(req, res);
}
