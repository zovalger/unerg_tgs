// endpoint para hacer el cambio de contraseña
import connectDb from "@/lib/db";
import { setPasswordUser_controller } from "@/controllers/auth.controller";

export default async function handler(req, res) {
	await connectDb();

	if (req.method === "POST") return await setPasswordUser_controller(req, res);
}
