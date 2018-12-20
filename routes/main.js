'use strict';
var home=require('./homepageRoutes');
var about=require("./aboutRoutes");
var defaultPage=require("./defaultErrorRoutes");
var login=require("./loginRoute");


module.exports = (app,dbClient)=> { 
  home(app,dbClient);
  about(app);
  login(app);
  defaultPage(app); //THIS SHOULD BE THE LAST ALWAYS AS IT WILL OVERRIDE EVERYTHING

};
