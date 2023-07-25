import { Schema, model } from "mongoose";

const ConfigSchema = Schema(
	{
		cron: {
			crontime: {
				type: String,
				require: true,
			},
			hasCallback: {
				type: Boolean,
				default: false,
			},
			overrideTime: {
				type: String,
				default: null,
			},
			hasOverrideTime: {
				type: Boolean,
				default: false,
			},
			holidayPeriod: {
				type: Date,
				default: null,
			},
		},
		slack: {
			channel: {
				type: String,
				default: null,
			},
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

export default model("Config", ConfigSchema);
