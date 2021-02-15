const https = require('https');
const fs = require('fs')
var express = require('express');
var path = require('path');
var app = express();
const bodyParser = require('body-parser')


const hostname = '127.0.0.1'; 
const port = 3000;
app.get('/',(req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  fs.createReadStream('./index.html').pipe(res);

});

//NO JSON FLEX
var studentPath = './data/students.json';

const file = require('./data/students.json');
app.post('/students', (req,res) =>{
req.on('data',function(data){

console.log(data.toString('utf8'));
removeBelt = data.toString('utf8').substring(0,data.toString('utf8').indexOf(','))
var name = data.toString('utf8').substring(data.toString('utf8').indexOf(',')+1,data.toString('utf8').lastIndexOf(','))
addBelt = data.toString('utf8').substring(data.toString('utf8').lastIndexOf(',')+1)
console.log(removeBelt)
console.log(name)
console.log(addBelt)
jay = file;
//NEED TO FIX THE NAME VARIABLE NOT BEING IMPLEMENTED CORRECTLY INTO THE JSON OBJECT.......
switch (addBelt) {

  case 'fundamentals':
      jay.fundamentals = {...jay.fundamentals, name:1}
    break;
  case 'white':
      jay.white = {...jay.white, name:1}
    break;
  case 'yellow':
      jay.yellow = {...jay.yellow, name:1}
    break;
  case 'orange':
      jay.orange = {...jay.orange, name:1}
    break;
  case 'green':
      jay.green = {...jay.green, name:1}
    break; 
  case 'blue':
      jay.blue = {...jay.blue, name:1}
    break;  
}

console.log(jay)
fs.writeFile(studentPath,JSON.stringify(jay),function writeJson(err){
  if(err) return console.log(err)
  console.log(JSON.stringify(file))
  console.log('writing to ' + studentPath)
})



});


})

app.get('/students',(req,res) =>{
var options = { 
  root: path.join(__dirname) 
};
res.statusCode = 200;
res.setHeader('Content-Type', 'application/json');
res.sendFile(studentPath,options,function(err){
  if(err){
    console.log(err)
  }else{
    console.log("Sent")
  }
})
})



app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'data')));
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});