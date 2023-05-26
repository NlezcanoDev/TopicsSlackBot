import { Schema, model } from "mongoose";

const TopicSchema = Schema(
	{
		topic: {
			type: String,
			required: true,
			trim: true,
		},
		meeting: {
			type: String,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("Topic", TopicSchema);
