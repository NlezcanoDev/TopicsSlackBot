import Topic from "../models/Topic";
import { RequestError } from "../errors";

const preferTopic = async (req, res, next) => {
	try {
		const data = await Topic.find().sort({ createdAt: -1 }).limit(1);
		if (!data.length) throw new RequestError("There is no document to edit");

		await Topic.findByIdAndUpdate(data[0]._id.toString(), { topic: req.body.text });
		res.status(200).json({
			response_type: "in_channel",
			text: "La temática fue cambiada. Happy daily!",
		});
	} catch (e) {
		next(e);
	}
};

export const SlackController = {
	preferTopic,
};
