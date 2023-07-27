import { Model, Schema, model } from "mongoose";

const LogSchema = Schema(
	{
		instance: {
			type: String,
			require: true,
			trim: true,
		},
		message: {
			type: String,
			require: true,
			trim: true,
		},
		stackTrace: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("Log", LogSchema);
