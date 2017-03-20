console.log('Loaded!');
/*var content=document.getElementById("content");
var button=document.getElementById("button");
button.onclick=function(){
    content.innerHTML="WELCOME TO MY WEBPAGE";
};
var i=document.getElementById("madi");
var marginLeft=0;
function moveRight(){
    marginLeft=marginLeft+1;
    i.style.marginLeft=marginLeft+'px';
}
i.onclick=function(){
var interval=setInterval(moveRight,50);    
 // i.style.marginLeft="100px";  
};*/
var x=document.getElementById("counter");
x.onclick=function(){
    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
      if(request.readyState===XMLHttpRequest.DONE){
          if(request.status===200){
              var counter=request.responseText;
              var span=document.getElementById("count");
              span.innerHTML=counter.toString();
          }
      }  
    };
    request.open('GET','http://nivetha96.imad.hasura-app.io/counter',true);
    request.send(null);
};
