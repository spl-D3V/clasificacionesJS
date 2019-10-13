require('./config/config');
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require("passport");
const fileUpload = require('express-fileupload');
let {Mongoose} = require('./models/db/mongoosedb');
let authenticate = require('./middleware/authenticate');
const {userAuthenticated, adminAuthenticated} = require('./middleware/checkPermissions');

const app = express();
const server = http.createServer(app);
authenticate();
// Settings
app.set('port', process.env.PORT);;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Middlewares
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
    secret:process.env.SESION_SECRET,
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
app.use('/general', userAuthenticated, require('./routes/general'));
app.use('/upload', adminAuthenticated, require('./routes/upload'));
app.use('/statistics', require('./routes/statistics'));
app.use('/static', userAuthenticated, express.static(path.join(__dirname, 'public')));
// Server listening
server.listen(app.get('port'), function () {
    console.log('SocketIO running' );
});
require('./routes/sockets')(server);