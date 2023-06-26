import { getAllNamesUsers_controller } from "@/controllers/chats.controller";
import connectDb from "@/lib/db";

export default async function handler(req, res) {
	await connectDb();

	// if (req.method === "GET") return await getAllNamesUsers_controller(req, res);
}
