const express = require('express');
const bodyParse = require('body-parser');
const consign = require('consign');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

consign()
	.include('../app/routes')
	.then('../app/models')
	.then('../app/controllers')
    .into(app);

app.use(function(req, res, next){
	res.status(404).send({'msg':'Rota não localizada'});
	next();
});
app.use(function(err, req, res, next){
	res.status(404).send({'msg':'Ocorreu um erro interno'});
	next();
});

module.exports = app;