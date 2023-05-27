const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema({
	// *************** datos personales ***************

	name: { type: String, trim: true, required: true },
	lastname: { type: String, trim: true },
	CI: { type: String, trim: true, required: true, unique: true },
	birthdate: { type: Date },
	addres: { type: String, trim: true, required: true },
	// bloodType: { type: String, trim: true },
	phone: { type: String, trim: true, required: true },
	// emergencyPhone: { type: String, trim: true },
	perfilImg: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "ImgFile",
		default: null,
	},

	// *************** Usuario ***************

	email: { type: String, required: true, trim: true, unique: true },
	password: { type: String, required: true, default: "password" },

	// ***************	logicos	***************

	role: { type: String, required: true, default: "admin", immutable: true },
	status: { type: String, default: "a" },

	permissions: [String],
});

export default mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
