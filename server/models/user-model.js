const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
	birthDate: { type: Date, required: true },
	gender: { type: String, required: true },
	avatar: { type: String, required: true },
});

module.exports = model("User", UserSchema);