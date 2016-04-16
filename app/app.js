var express = require('express');
var appRouter=require('./router/AppRouter');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var port=8081;
app.listen(port);
console.log('Magic happens on port '+ port);



app.use('/', appRouter);

