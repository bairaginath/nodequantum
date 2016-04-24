var express = require('express');
var userRouter = express.Router();
var persistenceStore=require('../config/persistenceConfig')
var User=require('../models/User')

//req.query.id for query param
//req.params.id for path param
userRouter.get('/getUser/:id',function(req, res) {
    var id=req.params.id;
    var session=persistenceStore.getSession();
    session.transaction(function(tx) {
            User.all(session).filter('id','=',id).one(tx,function(result){
                session.close();
                if(result==null){
                    res.json({});
                }
                else {res.json(result);}

            });

        });

});


userRouter.get('/findAllUsers', function (req, res) {
    var session=persistenceStore.getSession();
    session.transaction(function(tx) {
        User.all(session).list(tx,function(result){
            session.close();
            if(result==null){
                res.json([]);
            }
            else {res.json(result);}

        });

    });

});

userRouter.post('/addUser',function(req,res){
    var user=req.body;
    var session=persistenceStore.getSession();
    var userDb = new User(user);
    session.add(userDb);
    session.transaction(function(tx) {
        session.flush(tx,function(result){
            var id=result.insertId;
            user['id']=id;
            delete user['password'];
            session.close();
            res.json(user);
        });
    });

});


userRouter.put('/updateUser/:id',function(req,res){
    var id=req.params.id;
    var updatedUser=req.body;
    var session=persistenceStore.getSession();
    session.transaction(function(tx) {
        User.all(session).filter('id','=',id).one(tx,function(user){
            if(user==null){
                res.json({message:"User does not exist"});
            }
            else {
                user.email=updatedUser.email;
                user.first_name=updatedUser.first_name;
                user.last_name=updatedUser.last_name;
                user.password=updatedUser.password;
                session.flush(tx,function(result){
                    if(result.affectedRows>0){
                        res.json({message:"Succussfully user updated"});
                    }
                    else {
                        res.json({message:"failure on user updated"});
                    }

                });
            }


        });

    });

});


userRouter.delete('/deleteUser/:id',function(req,res){
    var id=req.params.id;
    var session=persistenceStore.getSession();
    session.transaction(function(tx) {
        User.all(session).filter('id','=',id).one(tx,function(user){
            if(user==null){
                res.json({message:"User does not exist"});
            }
            else {
                session.remove(user);
                session.flush(tx,function(result){
                    res.json({message:"Succussfully user delete"});
                });
                }


        });

    });

});


module.exports = userRouter;