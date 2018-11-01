const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
let {Mongoose} = require('./models/db/mongoosedb');
let authenticate = require('./middleware/authenticate');
const {userAuthenticated} = require('./middleware/checkPermissions');

const app = express();
const server = http.createServer(app);
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
// Routes
app.use('/', require('./routes/acceso'));
app.use('/inscripcion', userAuthenticated, require('./routes/inscripcion'));
app.use('/carrera', userAuthenticated, require('./routes/carrera'));
app.use('/static', userAuthenticated, express.static(path.join(__dirname, 'public')));
// Server listening
server.listen(app.get('port'), function () {
    console.log('SocketIO running' );
});
require('./routes/sockets')(server);