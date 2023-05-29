const mongoose = require("mongoose");

const DriverSchema = mongoose.Schema({
	// *************** datos personales ***************

	name: { type: String, trim: true, required: true },
	CI: { type: String, trim: true, required: true, unique: true },
	birthdate: { type: Date },
	address: { type: String, trim: true, required: true },
	bloodType: { type: String, trim: true },
	phone: { type: String, trim: true, required: true },
	emergencyPhone: { type: String, trim: true },

	// *************** Usuario ***************

	// username: { type: String, required: true, trim: true, unique: true },
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

	role: { type: String, required: true, default: "driver", immutable: true },
	status: { type: String, default: "a" },
	inService: { type: Boolean, default: false }, // si esta trabajando o no
	busId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Bus",
		default: null,
	},
	timetableId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Timetable",
		default: null,
	},
});

export default mongoose.models.Driver || mongoose.model("Driver", DriverSchema);
