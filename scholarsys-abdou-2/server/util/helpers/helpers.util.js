const fileUpload = require('express-fileupload');
const path = require('path');
const MB = 5; //MB
const SIZE_LIMIT = 5 * 1024 * 1024; //Byes
const pictureUploadMiddleware = (req, res, next) => {
	let userImage;
	if (!req.files) {
		return res.status(300).json({ success: 'false', message: 'image is missing' });
	}
	userImage = req.files.image;
	uploadPath = path.join(__dirname + '..', '..', 'public', 'profile-pictures');
	userImage.mv(uploadPath, function(err) {
		if (err) return res.status(500).send(err);

		res.send('File uploaded!');
	});
};
function between(value, first, last) {
	let lower = Math.min(first, last),
		upper = Math.max(first, last);
	return value >= lower && value <= upper;
}

function calculateSeanceTime(startingTime, duration_minute) {
	const sum = startingTime.startMinute + duration_minute;
	const hr = Math.trunc(sum / 60);
	const m = sum % 60;
	let endTime = {
		endHour: startingTime.startHour + hr,
		endMinute: m
	};
	return { startingTime, endTime };
}
function convertTime(timer) {
	return {
		startTime: timer.startingTime.startHour + timer.startingTime.startMinute * 0.01,
		endTime: timer.endTime.endHour + timer.endTime.endMinute * 0.01
	};
}
function verifyTime(firstTimer, secondTimer) {
	if (
		(firstTimer.startTime >= secondTimer.startTime &&
			firstTimer.startTime <= secondTimer.endTime) ||
		(firstTimer.endTime >= secondTimer.startTime && firstTimer.endTime <= secondTimer.endTime)
	)
		return false;

	return true;
}
module.exports = { between, pictureUploadMiddleware, calculateSeanceTime, convertTime, verifyTime };
