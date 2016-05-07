var app = require('./express.js');

app.post('/api/emails/newEmail',
	function(req, res){
		console.log('backend');
	}

);