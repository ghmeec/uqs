
//Next middlware wont be called unless next() of the current middleware
//of the current middleware is called

var home=require('./homepageMiddleware')
var about=require('./aboutMiddleware')

function middlewares(app){

about(app)
home(app)


}

module.exports=middlewares


/*COMMON USES OF MIDDLEWARES
 * 1. Cookies parsing
 * 2. Form-field handling
 * 3. Session handling
 * 4. Logging
 * 5. Error handling
 * 6. Authentication
 */
