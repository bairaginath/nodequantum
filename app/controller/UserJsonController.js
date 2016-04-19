var express = require('express');
var userRouter = express.Router();
var fs=require('fs');
var path = require("path");
var jsonFile=path.join(path.resolve(__dirname, '..'),'dao','users.json');
var jsonObject = require('../dao/users.json');

userRouter.get('/getUser/:id',function(req, res) {
    fs.readFile(jsonFile, 'utf8', function (err, data) {
        var id = req.params.id;
        var users=JSON.parse(data);
        res.json(users[id]);
    });
});

userRouter.get('/findAllUsers', function (req, res) {
    fs.readFile(jsonFile, 'utf8', function (err, data) {
        res.json(JSON.parse(data));
    });
});

userRouter.post('/addUser',function(req,res){

    var user=req.body;
    var id=Math.max.apply(Math,Object.keys(jsonObject))+1;
    user["id"]=id;
    jsonObject[id]=user;
    fs.writeFile(jsonFile, JSON.stringify(jsonObject), "utf8");
    res.json(user);   
});

userRouter.put('/updateUser/:id',function(req,res){
     var id=req.params.id;
     var updatedUser=req.body;
     var user= jsonObject[id];
     user.name=updatedUser.name;
     user.password=updatedUser.password;
     user.profession=updatedUser.profession;
     jsonObject[id]=user;
     fs.writeFile(jsonFile,JSON.stringify(jsonObject),"utf8");
     res.json(jsonObject[id]);
    
});

userRouter.delete('/deleteUser/:id',function(req,res){
    var id= req.params.id;
    delete jsonObject[id];
    fs.writeFile(jsonFile,JSON.stringify(jsonObject),"utf8");
    var message={ message : 'succussfully deleted user with id ='+id }
    res.json(message);
});

module.exports = userRouter;