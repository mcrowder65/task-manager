var app = require('./express.js');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
        extended: true
}));
var nodemailer = require('nodemailer');

app.post('/newEmail', function(req, res){
	console.log(req.body.sendingEmail);
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: req.body.sendingEmail,
			pass: req.body.sendingPassword
		}
	});

	var mailOptions =
	{
		from: req.body.sendingEmail,
		to: req.body.receivingEmail,
		subject: 'do this',
		html: req.body.emailBody
	};
	transporter.sendMail(mailOptions); 

	res.json(req.body);
});