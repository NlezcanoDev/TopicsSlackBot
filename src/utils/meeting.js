export const getMeeting = () => {
	const now = new Date().getHours();
	const currentHour = now - 3;
	return currentHour < 12 || currentHour > 18 ? "daily_dia" : "daily_tarde";
};
