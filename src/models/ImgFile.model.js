const mongoose = require("mongoose");

const ImgFileSchema = mongoose.Schema({
	img_local_url: { type: String, default: "" },
	img_local_url_original: { type: String, default: "" },
	img_public_id: { type: String, default: "" },
	img_cloudinary_url: { type: String, default: "" },
	width: { type: Number, default: 512 },
	// a: activo t:papelera d:eliminado
	status: { type: String, default: "a" },
});

export default mongoose.models.ImgFile ||
	mongoose.model("ImgFile", ImgFileSchema);
