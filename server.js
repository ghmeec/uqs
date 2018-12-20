//IMPORTATION
var express=require("express");
var routes=require('./routes/main');
var middlewares=require('./middlewares/main')
const path = require('path'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
morgan = require('morgan'),
MongoClient = require('mongodb').MongoClient;
methodOverride = require('method-override');
const assert = require('assert');
const rangi=require("./colors/colors_cli.js");
 
//INSTATIATION
var app=express();

//CONFIGURATIONS
app.set('port',process.env.PORT|8080)
app.set('views','public/');
app.set('view engine','ejs');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(express.static(__dirname + '/public')); //saving static contents
app.use('/public/', express.static(process.cwd() + '/public'));

//CUSTOM MIDDLWARES
middlewares(app);

//CONNECTION TO THE DATABASE
// Connection URL

const url = 'mongodb://localhost:27017';
var dbClient;
// Use connect method to connect to the server
MongoClient.connect(url,{useNewUrlParser:true}, function(err, client) {
 if(err){
     console.log("Failed to connect to the database");
     process.exit(1);
 }

 console.log(rangi.fg.kijani,"Successfully connected to the database",rangi.reset);
 dbClient=client;

 //ROUTES
 

 routes(app,dbClient);
 
 //RUNNIGN THE SERVER
 app.listen(app.get('port'),()=>{
     console.log(rangi.fg.kijani,`Server started at localhost:${app.get('port')}`,rangi.reset)
 });
});




