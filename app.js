var express 		= require('express');
var exSession 		= require('express-session');
var bodyParser 		= require('body-parser');
var doctor			= require('./controllers/doctor');
var patient			= require('./controllers/patient');
var registration	= require('./controllers/registration');
var login = require('./controllers/login');
var logout = require('./controllers/logout');
var appointment = require('./controllers/appointment');
var coockieParser=require('cookie-parser');
var fileUpload=require('express-fileupload');
//var exValidator = require('express-validator');
var app 		= express();

//config
app.set('view engine', 'ejs');

//middleware
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: false}));
app.use(exSession({secret: 'my secret value', saveUninitialized: true, resave: false}));
app.use(coockieParser());

app.use('/assets', express.static('assets'));
app.use('/bootstrap/css', express.static('node_modules/bootstrap/dist/css'));
app.use('/bootstrap/js', express.static('node_modules/bootstrap/dist/js'));
app.use('/jquery', express.static('node_modules/jquery/dist'));
app.use('/popper',express.static('node_modules/popper.js/dist'));
app.use('/img',express.static('assets/img'));
app.use('/files',express.static('assets/files'));
app.use('/css',express.static('assets/css'));
app.use('/js',express.static('assets/js'));

/*app.get('/admin/user/:abc/:name', function(req, res){
	res.send(req.params.abc+" | "+req.params.name);
});*/

//app.use('/login',login);
//app.use('/admin',admin);
//app.use('/doctor',doctor);
//app.use('/patient',patient);

app.use('/logout',logout);
app.use('/registration',registration);
app.use('/login',login);
app.use('/doctor',doctor);
app.use('/patient',patient);
app.use('/appointment',appointment);

app.get('/', function(req, res){
    res.redirect('/login');
});

app.listen(3000, function(){
    console.log('express http server started at...3000');
});
