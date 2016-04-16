var fs=require('fs');
var path = require("path");
var jsonFile=path.join(path.resolve(__dirname, '..'),'dao','users.json');
// var jsonObj = require(jsonFile);
var jsonObj = require('../dao/users.json');
fs.readFile(jsonFile,'utf8',function(err,data){

  console.log(Object.keys(jsonObj).length);

});