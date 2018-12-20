
function aboutRoute(app){
    app.get('/about/', function (req, res) {
        res.render('about/about')
    
      });    
}

module.exports=aboutRoute