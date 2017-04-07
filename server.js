var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3010;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

// Database
mongoose.connect(configDB.url);

require('./config/passport')(passport); 

// Express
app.use(morgan('dev')); 
app.use(cookieParser()); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(session({
    secret: 'jewareajew', 
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

// Routes
require('./app/routes.js')(app, passport);


app.listen(port);
console.log('Find your project on port ' + port);
