import { Schema, model } from "mongoose";

const TopicSchema = Schema(
	{
		topic: {
			type: String,
			required: true,
			trim: true,
		},
		tags: {
			type: Array,
			default: [],
		},
		create_date: {
			type: Date,
			default: new Date(),
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
