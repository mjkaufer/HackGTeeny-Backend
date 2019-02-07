//db gives us access to our database
var db = require('./dbs');
var path = require('path');

//variables in module.exports can be accessed by classes that import this one
//module.exports is a dictionary
module.exports = {};

//this adds the route for adding memes
//it's a POST request where the request body is a JSON object containing the fields 'url' and 'caption'
module.exports.add = function (req, res) {

	//if there isn't a url or caption in the body of the request, don't deal with it
	if (!(req.body["url"] && req.body["caption"]) || Object.keys(req.body).length != 2) {
		return res.status(400).send("Bad request");
	}


	//make sure we don't have any duplicates
	db.findOne(req.body, function (err, doc) {
		//if there are no duplicates
		if (doc === null) {
			//add a date & score field to our object and insert it into the database
			req.body["date"] = new Date();
			req.body["score"] = 0;
			db.insert(req.body);
			res.status(200).send("You did it!");
		} else {
			res.status(409).send("Nice try reposter");
		}
	});

	//todo, maybe add some validation to see if the file extension is in fact a .gif, and if it is a real image too
};

module.exports.vote = function (req, res) {
	//this simply finds a corresponding entry in our database and increments its score
	db.update(
		{_id: req.params.id},
		{
			$inc: {
				score: 1
			}
		}
	);

	res.status(200).send("Congrats you did it!");
};

module.exports.list = function (req, res) {

	//the find with {} returns all entries of the database, and the sort organizes entries by reverse chronological order - newest first
	//running exec will let us actually execute the query
	db.find({}).sort({date: -1}).exec(function (err, docs) {
		if (err) {
			console.log("Oh no!", err);
			res.status(400).send("Something bad happened");
		}
		//now we just send our data back, converting the JSON to a plain string so it can be transimtted
		res.status(200).json(docs);
	});

};

module.exports.api = function (req, res) {
	//this is a simple example of a basic web response
	//the number inside of `status` represents the HTTP response code
	//the string inside `send` is what the client receives
	res.status(200).send("Welcome to the secret developer page.<br><img src='https://media.giphy.com/media/kKefeMw8rbMVq/giphy.gif'><br>It's lit");
};

// middleware
// note, you should never hard code this stuff in
// usually it would be stored in a database, or if you just have one token, you'd set it through
// an environment variable
const token = 'howdy'

module.exports.middleware = function (req, res, next) {

	if (req.cookies.key == token) {
		// if their password is right, let them in
		next()
	} else {
		// otherwise, send them to the cookies
		res.redirect('/cookies');
	}
}

module.exports.sendFile = function (fileName) {
	return function(req, res) {
		res.sendFile(path.join(__dirname + fileName))
	}
}