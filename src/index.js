const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
let {Mongoose} = require('./models/db/mongoosedb');
let {Runner} = require('./models/Runner');
let {User} = require('./models/Usuario');
let authenticate = require('./middleware/authenticate');

const app = express();
authenticate();
// Settings
app.set('port', process.env.PORT || 3000);;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret:"añlsdkjf97qwer79q87ewr",
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.json());
// Routes
app.use('/', require('./routes/acceso'));
app.use('/inscripcion', require('./routes/inscripcion'));
app.use('/carrera',require('./routes/carrera'));
// Static files
//app.use(express.static(__dirname+'/public'));
// Server listening
app.listen(app.get('port'), ()=> {
    console.log('Server on port 3000');
    console.log(path.join(__dirname, "views"));
});