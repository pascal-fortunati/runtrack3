const e = require('express');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Moteur de template
app.set('view engine', 'ejs');

// Middleware pour les fichiers statiques
app.use(express.static(path.join(__dirname,'public')));

// routes
app.get('/:name', function(req, res){
  var data = {heures: '14h-18h', urgence: 'Pascal Fortunati', email: 'pascal.fortunati@laplateforme.io'};
  res.render('home', {pseudo: req.params.name, data: data});
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;