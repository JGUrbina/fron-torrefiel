const express = require('express');
const app = express();

// settings
app.set('port', process.env.PORT || 3001);
const PORT = app.get('port');

app.use(express.static('./dist/src'));

// routes
app.get('/*', (req, res) => {
  res.sendFile('index.html', {root: 'dist/src'})
});

// Start the server
app.listen(PORT, () => {
  console.log(`-- Corriendo en el puerto ${PORT} --`);
});