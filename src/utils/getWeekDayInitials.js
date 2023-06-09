const getWeekDayInitials = (day) => {
	switch (day) {
		case 0:
			return "D";
		case 1:
			return "L";
		case 2:
			return "M";
		case 3:
			return "X";
		case 4:
			return "J";
		case 5:
			return "V";
		case 6:
			return "S";
		default:
			return "";
	}
};

export default getWeekDayInitials;
