var app = require('./express.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true
}));

var bcrypt = require('bcrypt');
var SALT = bcrypt.genSaltSync();

var User = require('./user.js');
var order = require('./order.js');
var url = 'mongodb://localhost:27017/list';
var driveway = require('./driveway.js');
var reservation = require('./reservation.js');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'driveway.matt.c@gmail.com',
		pass: 'mattcrowder123'
	}
});
var transporter2 = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: 'questions.drivewayteam@gmail.com',
		pass: 'drivewayTeam12'
	}
});

app.post('/api/users/findEmail',
	function(req, res)
	{
		User.findOne({email: req.body.email},
			function(err, User)
			{
				if(User)
					res.json({email: User.email});
				else
					res.json({email: 'none'});
			});
	}

);
app.post
('/api/users/updatePassword',
	function(req, res)
	{
		var hashedPassword = bcrypt.hashSync(req.body.password, SALT);
		User.update({_id: req.body._id}, {password_hash: hashedPassword},
			function(err, User)
			{
				if(User)
					res.json({password: req.body.password});
				else
					res.sendStatus('403');
			});
	}
);
app.post
('/api/users/get',
	function(req, res)
	{
		User.findOne({_id: req.body._id},
			function(err, User)
			{
				if(User)
					res.json({username: User.username, email: User.email});
				else
					res.sendStatus('403');
			});
	}
);
app.post
('/api/users/getID',
	function(req, res)
	{
		User.findOne({username: req.body.username},
			function(err, User)
			{
				if(User)
					res.json({id: User._id});
				else
					res.sendStatus('403');
			});
	}

);
app.post
('/api/users/sendEmail',
	function(req, res)
	{
		var email = req.body.email;
		var href = 'http://ec2-52-10-45-219.us-west-2.compute.amazonaws.com:3000/#/updatePassword?id=' + req.body.id;
		var mailOptions =
		{
			from: 'Driveway Team <driveway.matt.c@gmail.com>',
			to: email,
			subject: 'Requested password change',
			html: '<a href='+href+'>Click this link to reset your password</a>'
		};
		transporter.sendMail(mailOptions, 
		function(error, info)
		{
		    if(error)
		    {
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		    res.json({info: info});
		});		

	}
	
);

app.post
('/api/emailUs',
	function(req, res)
	{
		var emailBody = '<p>' + req.body.emailBody + '</p>';
		var email = 'driveway.matt.c@gmail.com'
		var href = 'http://ec2-52-10-45-219.us-west-2.compute.amazonaws.com:3000/#/updatePassword?id=' + req.body.id;
		var mailOptions =
		{
			from: 'Driveway Team Questions<questions.drivewayteam@gmail.com>',
			to: email,
			subject: 'Questions from users',
			html: emailBody
		};
		transporter2.sendMail(mailOptions, 
		function(error, info)
		{
		    if(error)
		    {
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		    res.json({info: info});
		});		

	}
	
);

app.post
('/api/emailOrder',
	function(req, res)
	{
		var email = req.body.email;
		var email2 = req.body.email2;
		var name = req.body.name;
		var cardType = req.body.cardType;
		var last4 = req.body.last4;
		var totalP = req.body.totalP;
		var resAdd = req.body.resAdd;
		var state = req.body.state;
		var zip = req.body.zipC;
		var resDate = req.body.dateOfRes;
		var timeOfRes = req.body.timeOfRes;
		var resDur = req.body.resDur;
		var city = req.body.city;



		var emailBod = '<p>'+"Order Details " + '</p>'+'<p>'+"Name: " + name + '</p>' + '<p>'+"Email: " + email2 + '</p>' + '<p>'+"Reserved Address: " + resAdd + '</p>' + '<p>'+"City: " + city + '</p>' + '<p>'+"State: " + state + '</p>' +'<p>'+"Zip: " + zip + '</p>' + '<p>'+"Reservation Date: " + resDate + '</p>' + '<p>'+"Time of Reservation: " + timeOfRes + '</p>' + '<p>'+"Reservation Duration: " + resDur + '</p>' + '<p>'+"Card Type: " + cardType + '</p>' + '<p>'+"Last 4 Digits of CC: " + last4 + '</p>' + '<p>'+"Total Price: $" + totalP + '</p>'
		var href = 'http://ec2-52-10-45-219.us-west-2.compute.amazonaws.com:3000/#/updatePassword?id=' + req.body.id;
		var mailOptions =
		{
			from: 'Driveway Team <driveway.matt.c@gmail.com>',
			to: email,
			subject: 'Order Confirmation',
			html: emailBod
		};
		transporter.sendMail(mailOptions, 
		function(error, info)
		{
		    if(error)
		    {
		        return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		    res.json({info: info});
		});		
	}
	
);
app.post
('/api/users/deleteReservation',
	function(req, res)
	{
		reservation.remove({_id: req.body._id},
			function(err, reservation)
			{
				if(reservation)
					res.sendStatus('200');
			});
	}
);
app.post
('/api/users/updateDriveway',
	function(req, res)
	{
		driveway.update({_id: req.body._id}, {address: req.body.address, numCars: req.body.numCars,
											  city: req.body.city, zip: req.body.zip, state: req.body.state,
											  times: req.body.times, fee: req.body.fee, location: req.body.location},
		function(err, driveway)
		{
			if(driveway)
				res.json({driveway: driveway});
			else
				res.sendStatus('403');
		});
	}
);
app.post
('/api/users/queryID',
	function(req, res)
	{
		driveway.find({_id: req.body._id},
		function(err, driveway)
		{
			if(driveway)
				res.json({driveway: driveway});
			else
				res.sendStatus('403');
		});
	}
);

app.post
('/api/users/getDriveways',
	function (req, res)
	{
		driveway.find({username: req.body.username},
		function(err, driveway)
		{
			if (driveway)
				res.json({driveway: driveway});
			else
				res.sendStatus("403");
		});
	}
);
app.post
('/api/users/deleteDriveway',
	function (req, res)
	{
		driveway.remove({_id: req.body._id},
		function(err, driveway)
		{
			if (driveway)
				res.json({driveway: driveway});
			else
				res.sendStatus("403");
		});
	}
);
app.post
('/api/users/getAllDriveways',
	function (req, res)
	{
		driveway.find({},
		function(err, driveway)
		{
			if (driveway)
				res.json({driveway: driveway});
			else
				res.sendStatus("403");
		});
	}
);
app.post
('/api/users/addDriveway',
	function (req, res)
	{

		driveway.findOrCreate({
			username: req.body.username, address: req.body.address, zip: req.body.zip, 
			city: req.body.city, state: req.body.state, numCars: req.body.numCars, 
			times: req.body.times, fee: req.body.fee, location: req.body.location},
		
		function(err, driveway, created)
		{
			if (created)
			{
				driveway.address = req.body.address;
				driveway.username = req.body.username;
				driveway.zip = req.body.zip;
				driveway.city = req.body.city;
				driveway.times = req.body.times;
				driveway.fee = req.body.fee;
				driveway.location = req.body.location;
				driveway.save
				(
					function(err)
					{
						if(err)
						{
							res.sendStatus("403");
							return;
						}
						res.json({username: driveway.username, address: driveway.address, zip: driveway.zip, times: driveway.times});
					}
				);
			}
			else if(driveway)
				res.json({username: 'already exists'});
			else
				res.sendStatus("403");
		});
	}
);
app.post
('/api/users/register', 
	function (req, res) 
	{
		User.findOrCreate({username: req.body.username, email: req.body.email}, 
		function(err, user, created) 
		{
	        if (created) 
	        {
	            // if this username is not taken, then create a user record
	            user.name = req.body.name;
	            user.email = req.body.email;
	            user.set_password(req.body.password);
	            user.save
	            (
	            	function(err) 
		        	{	
						if (err) 
						{
						    res.sendStatus("403");
						    return;
						}
				                // create a token
						var token = User.generateToken(user.username);
				                // return value is JSON containing the user's name and token
				        res.json({username: user.username, email: user.email, token: token});
		        	}
		       	);
	        } 
	        else 
	        {
	            // return an error if the username is taken
	            res.sendStatus("403");
	        }
	    });
	}
);

app.post
('/api/users/addReservation',
	function (req, res)
	{
		reservation.findOrCreate({drivewayId: req.body.drivewayId, date: req.body.resDate, buyer: req.body.buyer},
		function(err, reservation, created)
		{

			if (created)
			{	console.log('time: ' + req.body.time);
				reservation.buyer = req.body.buyer;
				reservation.owner = req.body.owner;
				reservation.drivewayId = req.body.drivewayId;
				reservation.date = req.body.date;
				reservation.time = req.body.time;
				reservation.save
				(
					function(err)
					{
						if(err)
						{
							res.sendStatus("403");
							return;
						}
						res.json({drivewayId: req.body.drivewayId});
					}
				);
			}
			else
				res.sendStatus("403");
		});
	}
);
app.post
('/api/users/getUserReservations',
	function(req, res)
	{
		reservation.find({owner: req.body.username},
			function(err, reservations)
			{
				if(reservation)
				{
					res.json({reservations: reservations})
				}
			});
	}
);
app.post
('/api/users/getAllReservations',
	function (req, res)
	{
		reservation.find({},
		function(err, reservations)
		{
			if (reservation)
				res.json({reservations: reservations});
			else
				res.sendStatus("403");
		});
	}
);

app.post('/api/users/login', function (req, res) 
{
    // find the user with the given username
    User.findOne({username: req.body.username}, function(err,user) 
    {
		if (err) 
		{
		    res.sendStatus(403);
		    return;
		}
        // validate the user exists and the password is correct 
        if (user && user.checkPassword(req.body.password)) 
        {
            // create a token
            var token = User.generateToken(user.username);
            res.json({username: req.body.username, email: user.email, token: token});
            //console.log(token);
        } 
        else 
        {
            res.sendStatus(403);
        }
    });
});

app.post
('/api/orders/getAllOrders',
	function (req, res)
	{
		order.find({last4: req.body.last4, email: req.body.email},
		function(err, order)
		{
			if (order)
				res.json({order: order});
			else
				res.sendStatus("403");
		});
	}
);

app.post('/api/payment/chargeToken', function (req, res) 
{
	console.log("entered api! charge");
    // find the user with the given username
    var stripe = require("stripe")("sk_test_AYUBJ4KoeKWRDh0mGGScSTvh");
    stripe.setApiVersion('2015-10-16');

	// (Assuming you're using express - expressjs.com)
	// Get the credit card details submitted by the form
	var stripeToken = req.body.stripeToken;
	var tPrice = req.body.tPrice;
	console.log(tPrice);
	console.log("----------");
	console.log(stripeToken);

	var charge = stripe.charges.create({
	  amount: 1000, // amount in cents, again
	  currency: "usd",
	  source: stripeToken.id,
	  description: "Example charge"
	}, function(err, charge) {
	  if (err && err.type === 'StripeCardError') {
	    console.log("error");
	  }
	  else{
	  	console.log("in here");
	  	console.log(stripeToken.id);
	  	order.findOrCreate({email: stripeToken.email, last4: stripeToken.card.last4, tokenid: stripeToken.id},
	  	function(err, order, created)
	  	{
	  		if(created)
	  		{
	  			order.email = stripeToken.email;
	  			order.last4 = stripeToken.card.last4;
	  			order.name1 = stripeToken.card.name;
	  			order.address = req.body.streetAddress;
	  			order.city = req.body.city;
	  			order.state = req.body.state;
	  			order.zip = req.body.zip;
	  			order.price = req.body.price;
	  			order.reservationDate = req.body.reservationDate;
	  			order.reservationDuration = req.body.reservationDuration;
	  			order.reservationTime = req.body.reservationTime;
	  			order.stripeTokenId = stripeToken.id;
	  			order.cardType = stripeToken.card.brand;
	  			order.save
	  			(
	  				function(err)
	  				{
	  					if(err)
	  					{
	  						res.sendStatus("403");
	  						return;
	  					}

	  					res.json({tokenId: stripeToken.id});
	  				}
	  			);
	  		}
	  		else
	  			res.sendStatus("403");

	  	});
	  	
	  }
	});
});












