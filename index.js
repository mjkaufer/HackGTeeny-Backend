//dependencies for our web server
//express does most of the heavy lifting
var express = require('express');
//body parser lets us receive JSON data in the body of POST requests
var bodyParser = require('body-parser');
//path is just to help us a little later on, in order to find the directory where our public assets are
var path = require('path');
var cookieParser = require('cookie-parser');


//requires our helpful database file from dbs.js
var controller = require('./controller');

//sets up web server
var app = express();

var requireAuth = true

//some nerd stuff that sets your server port and lets you read POST requests with a JSON payload
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(cookieParser());

// if we want the user to authenticate
if (requireAuth) {
    // add the middleware
    app.use('/js', express.static(path.join(__dirname, '/public/js')));
    app.use('/cookies', express.static(path.join(__dirname, '/public/cookies.html')));
    app.use(controller.middleware)

    app.get('/', controller.sendFile('/public/index.html'));
    
} else {
    //lets us access the files in our `public` folder, so going to http://yourwebsite.com/ will open index.html, located in the `public` folder
    app.use(express.static(path.join(__dirname, 'public')));
}


//when the user makes a get request to http://yourwebsite.com/api, they'll get a secret page!
app.get('/api', controller.api);

//users must make a POST request to /api/add to add content
//you can see the actual logic in controller.js, under the function `add`
app.post('/api/add', controller.add);

//when the user makes a GET request to /api/list, they can get a list of all of the entries
//you can see the actual logic in controller.js, under the function `list`
app.get('/api/list', controller.list);

//this lets the user vote up posts
//when they make the request, the :id post is replaced by the element id in the database
//an example request might point to a URL like /api/vote/xja02j20glsmx
//the logic's in controller.js
//there's no logic to prevent users from accessing this route multiple times, so maybe add some auth
app.get('/api/vote/:id', controller.vote);


//starts the app on the port we defined earlier
//kill the app with ctrl-c in the terminal
//to actually run the app tho, run `node index.js`
app.listen(app.get('port'), function() {
	console.log('App is running at http://localhost:%d', app.get('port')); 
	console.log('  Press CTRL-C to stop\n');
});

module.exports = app;