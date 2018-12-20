
function defaultError(app){
     //INCASE ALL ROUTES FAILS
  app.get('*', (req, res) => {
    res.end("<h1>Unable to find page you have been looking for</h1>")
  })
}

module.exports=defaultError