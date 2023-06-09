const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
	{
		_chatId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chat",
			required: true,
		},
		text: { type: String, default: null },
		urlPhoto: {
			url: { type: String, default: null },
			imgfileId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "ImgFile",
				default: null,
			},
		},
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
	{ timestamps: true }
);

export default mongoose.models?.Message || mongoose.model("Message", MessageSchema);
