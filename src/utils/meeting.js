export const getMeeting = () => {
	const now = new Date().getHours();
	return now < 12 || now > 18 ? "daily_dia" : "daily_tarde";
};
