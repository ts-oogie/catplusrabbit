const express = require('express');   
const app = express();    

const port = process.env.PORT || 8000;    

app.use('/', express.static(__dirname + '/dist'));
 
app.get('/' , function(req, res ){ 
    res.sendFile(__dirname + '/dist/index.html');
});

app.get('/scene/:sceneid/xPos/:xVal/yPos/:yVal', (req, res)=>{
    console.log("Scene id : " + req.params.sceneid)
    console.log("Xpos : " + req.params.xVal)
    console.log("Ypos : " + req.params.yVal) 


})

console.log("Animal Spirits running at port : " + port );
console.log(__dirname);

app.listen(port);