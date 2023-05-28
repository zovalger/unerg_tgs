const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
	// *************** datos personales ***************

	name: { type: String, trim: true, required: true },
	CI: { type: String, trim: true, required: true, unique: true },
	birthdate: { type: Date },
	address: { type: String, trim: true, required: true },
	phone: { type: String, trim: true, required: true },

	// *************** Usuario ***************

	email: { type: String, required: true, trim: true, unique: true },
	password: { type: String, required: true, default: "password" },
	perfilImg: {
		url: { type: String, default: null },
		imgfileId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ImgFile",
			default: null,
		},
	},

	// ***************	logicos	***************

	role: { type: String, required: true, default: "admin", immutable: true },
	status: { type: String, default: "a" },

	// se guardaran las key de
	permissions: [String],
});

export default mongoose.models?.Admin || mongoose.model("Admin", AdminSchema);
