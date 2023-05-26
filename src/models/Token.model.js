const mongoose = require("mongoose");

const TokenSchema = mongoose.Schema({
	text: { type: String, required: true },
	used: { type: Boolean, default: false },
});

export default mongoose.models.Token || mongoose.model("Token", TokenSchema);
