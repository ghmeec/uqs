var rangi=require("../colors/colors_cli");
var requestMessage='';
const optionDB='uqs';
var availabelPosts=[];
var finalPosts;
var collection;

var custom="";



//Finding specific documents
function findDocument(db,res,url,custom,collectionToSearch) {
  // Get the documents collection
  const collection = db.collection(collectionToSearch);

   console.log(collectionToSearch)
  // Find some documents
  collection.find({'id':url.body.q},{_id:0}).toArray(function(err, docs) {
    
    if(url.body.q==''){
    requestMessage='';
    }else{
    requestMessage=`
    <h3 style="font-size:1.2em;color:teal;">Request for: ${url.body.q}</h3>
    `;
    }

    if(err){
      console.log(err)
    }
    console.log(rangi.fg.kijani,"The following document was sent back to the user",rangi.reset);
    console.log(docs[0]);
    var tempo=``;

    if(docs[0]!=undefined){
    var tempoDocs=docs[0];
    
    tempo=`<div class="container-fluid" style="text-align:left;padding-left:5px;font-size:1.2em;color:white;text-transform:capitalize"> `   


  
    Object.entries(docs[0]).forEach(([key, value]) => {   
    tempo+=`<pre> ${(key)} :  ${(value)}</pre>`; 
    });

  
    tempo+=`
    </div>
    <br><br>
    `;
     }else{
    tempo=`
      <div class="container-fluid" style="text-align:left;padding-left:2px;">
            <h3 style="color:red;">Status : Unallocated</h3>
        </div>
        <br><br>
        `;
    }
    res.render('homepage',{title:"UQS-Home",links:{about:'about/',login:"login"},n:requestMessage,data:tempo,available:custom}) 
    
  });
}

function homepageRoute(app,dbClient){


app.get('/', function (req, res) {
    var url;
       
   custom+='';
    if(req.query.q||(url!='')){
     url=`
     <h3 style="font-size:60px;color:red;">Request for: ${url}</h3>
     `;}

     else{
       url='';
     }
 
   const db2 = dbClient.db(optionDB);
   db2.collections(function(err,cols){
   cols.map((collection)=>{
      availabelPosts.push(collection.s.name);
      finalPosts=availabelPosts; 
     custom+=`<div class="container-fluid" style="text-transform:capitalize;">
   <div class="form-group row" style="border-radius:5px;border:none;overflow:hidden;">
   <div class="col-2" style="text-align:right;background-color:#888;padding-top:8px;">
   <input value="${collection.s.name}" id="${collection.s.name}" type="radio" class="form-check-input" name="searchCustomization">
   </div>
   <div class="col-10 col-form-label" style="text-align:left;font-size:1.2em;background-color:#555;color:white">
   <label for="${collection.s.name}" style="width:100%;height:100%;">${collection.s.name.replace(new RegExp('_', 'g'), ' ')}</label>
   </div> 
   </div></div>`;
   })
   });
   
  
 console.log(custom)
 res.render('homepage',{title:"UQS - Home ",links:{about:'about/',login:"login"},n:'',data:'',available:custom})
   availabelPosts=[];
   custom='';
});

  app.post('/',(req,res)=>{
    
   const db2 = dbClient.db(optionDB);
   db2.collections(function(err,cols){

   cols.map((collection)=>{
      availabelPosts.push(collection.s.name);
      finalPosts=availabelPosts; 
      custom+=`<div class="container-fluid" style="text-transform:capitalize;">
   <div class="form-group row" style="border-radius:5px;border:none;overflow:hidden;">
   <div class="col-2" style="text-align:right;background-color:#888;padding-top:8px;">
   <input value="${collection.s.name}" id="${collection.s.name}" type="radio" class="form-check-input" name="searchCustomization">
   </div>
   <div class="col-10 col-form-label" style="text-align:left;font-size:1.2em;background-color:#555;color:white">
   <label for="${collection.s.name}" >${collection.s.name.replace(new RegExp('_', 'g'), ' ')}</label>
   </div> 
   </div></div>`;
   })
   });

  
     
     
    var url;
    if(req.body.searchCustomization==''||req.body.searchCustomization==null||req.body.searchCustomization==undefined){
     
    }else{
    collection=req.body.searchCustomization;
    }

    if(req.body.q!=''||req.body!=undefined){
    console.log(req.body.q);
    url=req;
    }

     else{
       url='';
     }
    var data=findDocument(dbClient.db(optionDB),res,url,custom,collection);
    custom='';
  });

}

module.exports=homepageRoute;
