const mongoose = require("mongoose");

const ImgFileSchema = mongoose.Schema({
	public_id: { type: String, default: "" },
	url: { type: String, default: "" },
	status: { type: String, default: "a" },
});

export default mongoose.models.ImgFile ||
	mongoose.model("ImgFile", ImgFileSchema);
