const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema({
	_chatId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Chat",
		required: true,
	},
	text: { type: String, default: null },
	urlPhoto: { type: String, default: null },
	response: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Message",
		default: null,
	},
	driverId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Driver",
		default: null,
	},
	adminId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Admin",
		default: null,
	},
},
	{ timestamps: true },
);

export default mongoose.models.Chat || mongoose.model("Chat", ChatSchema);