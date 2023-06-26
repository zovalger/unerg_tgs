import ErrorsMessages from "@/config/errorsMessages";
import { getAllNamesUsers_service } from "@/services/chats.service";

// ********************************************************************
// 									buses: Creacion
// ********************************************************************

export const getAllNamesUsers_controller = async (req, res) => {
	try {
		// Formateado de datos

		// creacion del bus
		const names = await getAllNamesUsers_service();

		// si no se creo se le envia un error 500
		if (!names)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (names.error) return res.status(500).json(names);

		// se devuelve el bus exitosamente
		return res.status(200).json(names);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};
