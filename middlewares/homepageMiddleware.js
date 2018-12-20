var currentTime=new Date();
module.exports=function home(app) {
    app.use('/',(req,res,next)=>{
    console.log("Requested Received on "+currentTime.getDate()+"/"+currentTime.getMonth()+"/"+currentTime.getFullYear());
    return next();
});

    app.use('/',(req,res,next)=>{
    var ip=req.ip.split(":")[3];
    console.log("Client IP adress : "+ip);
    console.log("First midddleware processed the data successfully");
    return next();
});

app.use('/',(req,res,next)=>{
    console.log("Second middleware processed the data successfully");
    console.log("");
    return next();
    
});

};

