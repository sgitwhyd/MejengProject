const formatedDate = (date) => {
	const dateObject = new Date(date);
	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};
	return dateObject.toLocaleDateString("id-ID", options);
};

export const formatedHours = (date) => {
	const dateObject = new Date(date);
	const currentDate = new Date();
	const diff = currentDate.getTime() - dateObject.getTime();
	const diffInHours = Math.round(diff / (1000 * 60 * 60));
	if (diffInHours < 24) {
		if (diffInHours < 1 / 60) {
			return "a few minutes ago";
		} else {
			return `${diffInHours} hours ago`;
		}
	} else {
		return formatedDate(date);
	}
};
