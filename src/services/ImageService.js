import ImgFileModel from "@/models/ImgFile.model";
import { uploadImageBase64, deleteImage } from "@/lib/cloudinary";

export const createImgFile = async (dataBase64) => {
	try {
		console.log("obteniendo imagen");
		const imgfile = new ImgFileModel();

		console.log("subiendo imagen");

		const r = await uploadImageBase64(dataBase64);
		console.log("imagen subida");

		imgfile.public_id = r.public_id;
		imgfile.url = r.secure_url;

		console.log("guardando en DB");

		await imgfile.save();

		console.log("Devolviendo esquema");

		return imgfile;
	} catch (error) {
		console.log("Error al subir la imagen");
		console.log(error);

		return { error, message: "No se pudo guardar la imagen" };
	}
};

export const getImgFile = async (_id) => {
	try {
		const imgfile = await ImgFileModel.findById(_id);

		return imgfile;
	} catch (error) {
		console.log(error);
	}
};

export const deleteImgFile = async (_id) => {
	try {
		const imgfile = await ImgFileModel.findById(_id);

		await deleteImage(imgfile.public_id);

		return imgfile;
	} catch (error) {
		console.log(error);
	}
};
