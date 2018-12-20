var btn,form;

window.onload=()=>{
    console.log("Fully loaded")
   btn=document.querySelector("#btn")
   form=document.querySelector("form")[0] 
}

 btn.onclick=()=>{
     alert("Botton clicked alread")
 }


form.onsubmit=()=>{
    alert("About to go to server")
}