function loginRoute(app){
    app.get('/login/', function (req, res) {
        res.render('login/login');
      });    
}

module.exports=loginRoute;