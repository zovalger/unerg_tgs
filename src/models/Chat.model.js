const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
	driverId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Driver",
		default: null,
	},
},
	{ timestamps: true },
);

export default mongoose.models?.Chat || mongoose.model("Chat", ChatSchema);

