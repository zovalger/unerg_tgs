export default function calculateAge(birthday) {
	var ageDifMs = Date.now() - birthday.getTime();
	var ageDate = new Date(ageDifMs);

	var years = ageDate.getUTCFullYear() - 1970;
	var months = ageDate.getUTCMonth();
	var days = ageDate.getUTCDate() - 1;

	if (months < 0 || (months === 0 && days < 0)) {
		years--;
	}

	return years;
}
