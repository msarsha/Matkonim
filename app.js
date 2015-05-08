var express = require('express'),
	session = require('express-session'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	passport = require('passport')


//connect to DB
mongoose.connect("mongodb://mapp:mapp123@ds063779.mongolab.com:63779/matkonimdb");

//initialize db models
require('./models/userModel');
require('./models/matkonModel');

//initialize routes
var authApi = require('./routes/auth');
var matkonimApi = require('./routes/matkonim');
var indexRoute = require('./routes/index');

var app = express();

app.use(express.static(__dirname + '/public'));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(session({secret: "matkonSecret"}));
app.use(passport.initialize());
app.use(passport.session());

//routes
app.use('/', indexRoute);
app.use('/auth', authApi);
app.use('/api', matkonimApi);


require('./passport_init')(passport);

var port = process.env.PORT || 3000;

app.listen(port);
console.log('Server running on port ' + port + '... ');