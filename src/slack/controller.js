const chanllenge = async (req, res) => {
	const challenge = req.body.challenge;
	res.status(200).json({ challenge });
};

export const SlackController = {
	chanllenge,
};
