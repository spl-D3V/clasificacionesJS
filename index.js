const express = require('express');
const app = express();
let {Mongoose} = require('./models/db/mongoosedb');
let {Runner} = require('./models/Runner');
// Settings
app.set('port', process.env.PORT || 3000);
// Middlewares
//app.use(express.json());
// Routes
app.use('/carrera',require('./routes/rutas'));
// Static files
app.use(express.static(__dirname+'/public'));
// Server listening
app.listen(app.get('port'), ()=> console.log('Server on port 3000', __dirname));