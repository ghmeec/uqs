'use-strict'
module.exports=function about(app){
    app.use('/about',(req,res,next)=>{
        console.log('Data in the about middlewares successfully processed');
        return next();
    })

}
