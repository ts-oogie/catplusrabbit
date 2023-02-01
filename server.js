const express = require('express');   
const app = express();      

const port = process.env.PORT || 8000;    
 
app.get('/' , function(req, res ){ 
    res.sendFile(__dirname + '/dist/index.html');
});

console.log("running at port : " + port );
console.log(__dirname);

app.listen(port);