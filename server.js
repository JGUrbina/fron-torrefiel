const express = require('express');
const path = require('path');

const app = express();

// settings
app.set('port', process.env.PORT || 3001);
const PORT = app.get('port');

app.use(express.static(__dirname+'/dist/src'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/src/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`-- Corriendo en el puerto ${PORT} --`);
});