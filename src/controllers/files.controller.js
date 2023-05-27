import { SECRET_WORD } from "@/config";

import ErrorsMessages from "@/config/errorsMessages";
import { createImgFile } from "@/services/ImageService";

export const uploadImageBase64_controller = async (req, res) => {
	// obtencion de datos de la request
	const { data: dataBase64 } = req.body;

	try {
		// creacion del waypoint
		const imgfile = await createImgFile(dataBase64);

		// si no se creo se le envia un error 500
		if (!imgfile)
			return res
				.status(500)
				.json({ error: true, message: ErrorsMessages.inServer });

		// si la funcion devuelve algun error se le enviara al cliente
		if (imgfile.error) return res.status(500).json(imgfile);

		// se devuelve el waypoint exitosamente
		return res.status(200).json(imgfile);
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: true, message: ErrorsMessages.inServer });
	}
};
