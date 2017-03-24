var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config={
    user: 'nivetha96',
    database:'nivetha96',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:'db-nivetha96-98278'
    };
var app = express();
app.use(morgan('combined'));

var articles={
    'article-one':{
    title: "article-one",
    heading: "ARTICLE-ONE",
    content:
   ` <div align="center">
<h1>hello</h1>
</div>`
},
'article-two':{
    title: "article-two",
    heading: "ARTICLE-TWO",
    content:
   ` <div align="center">
<h1>hello</h1>
</div>`
},
 'article-three':{
    title: "article-three",
    heading: "ARTICLE-THREE",
    content:
   ` <div align="center">
<h1>hello</h1>
</div>`
}};
function createTemplate(data){
var title=data.title;
var heading=data.heading;
var content=data.content;
var html_template=`<!DOCTYPE html>
<html>
<head>
        <link href="/ui/style.css" rel="stylesheet" />
        <title>${title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1"/> 
</head>
<body>
    <div>
        <a href="/">HOME</a>
    </div><hr/>
<div align="center">
<h1>${heading}</h1>
</div>
<div>${content}</div>
</body>
</html>`;
return html_template;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool=new Pool(config);
app.get('/user-db',function(req,res){
    pool.query("SELECT * FROM user", function(err,result){
       if(err){res.status(500).send(err.toString());}
       else{
           res.send(JSON.stringify(result));
       }
    });
});

var counter=0;
app.get('/counter',function(req,res){
  counter=counter+1;
res.send(counter.toString());
});
app.get('/:articleName',function(req,res){
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/personal.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'personal.html'));
});


app.get('/ui/mainn.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'mainn.js'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
var names=[];
//method-1
/*app.get('/ui/personal.html/submit/:name',function(req,res){
    var name=req.params.name;
    
    names.push(name);
    
    res.send(JSON.stringify(names));
});*/
//method-2
app.get('/ui/personal.html/submit',function(req,res){
    var name=req.query.name;
    
    names.push(name);
    
    res.send(JSON.stringify(names));
});
app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/ui/IMG_0377.JPG', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'IMG_0377.JPG'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
