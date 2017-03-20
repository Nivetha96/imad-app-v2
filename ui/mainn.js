var s=document.getElementById("submit");
s.onclick=function(){
var n=document.getElementById("hobby").value;

    var request=new XMLHttpRequest();
    request.onreadystatechange=function(){
      if(request.readyState===XMLHttpRequest.DONE){
          if(request.status===200){
    var names=request.responseText;
    names=JSON.parse(names);
    var list='';
    for(var i=0;i<names.length;i++){
        list +='<li>'+names[i]+'</li>';
        
    }
    var ul=document.getElementById("namelist");
    ul.innerHTML=list;     
          }
      }  
    };
    request.open('GET','http://nivetha96.imad.hasura-app.io/ui/personal.html/submit?name='+n,true);
    request.send(null);

};
