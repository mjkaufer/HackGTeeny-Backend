//import our database so we can instantiate it
var Datastore = require('nedb')

//make an instance of it, store data in `data.db`
var db = new Datastore({ filename: __dirname + '/data.db', autoload: true });

//export the database, so other files can use it (mainly our index.js)
module.exports = db;