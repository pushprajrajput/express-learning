var express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient

var URL = 'mongodb://localhost:27017/userdb'

var app = express();

app.set('port', process.env.PORT || 8081);
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));

MongoClient.connect(URL, function(err, db) {
  if (err) return;

app.get('/',function(req,res){
    db.collection('users').find().toArray((err, data)=>{
    if(err) console.log(err);
    res.render('users',{users:data});
    })
});

app.post('/user/save',function(req,res){
    db.collection('users').save(req.body,(err, data)=>{
    if(err) console.log(err);
    res.redirect('/');
    })
});

app.listen(8081,function(){
    console.log("Application running on port 8081");
});

});