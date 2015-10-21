var express = require('express');

var app = express()

var http = require('http'),

fs = require('fs');

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname  + '/views');
app.engine('html', require('ejs').renderFile); //TODO npm install ejs
app.set('view engine', 'html');

app.get('/', function (req, res) {
   res.render('index.html');
});

var server = app.listen(8080, function () {

var host = server.address().address
var port = server.address().port
})