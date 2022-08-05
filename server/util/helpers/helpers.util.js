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

module.exports = pictureUploadMiddleware;
