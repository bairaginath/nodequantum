var express = require('express');
var userRouter = express.Router();
var connection=require('../config/dbconfig')
var mysql=require('mysql')

//req.query.id for query param
//req.params.id for path param
userRouter.get('/getUser/:id',function(req, res) {
    var id=req.params.id;
    connection.connect(function(err){});
    var query='SELECT * from user where ??= ?'
    var inserts = ['id', id];
    query = mysql.format(query, inserts);
    connection.query(query,function(err,rows){
            if (err) throw err;
            data=rows[0];
            res.json(data);        
    })
});


userRouter.get('/findAllUsers', function (req, res) {
    connection.connect(function(err){});
    var query='SELECT * from user';
    connection.query(query,function(err,rows){
        if (err) throw err;
        res.json(rows);
    })

});

userRouter.post('/addUser',function(req,res){
    var user=req.body;
    connection.connect(function(err){});
    connection.query('INSERT INTO user SET ?',user,function(err,result){
        if (err) throw err;
        var id=result.insertId;
        user['id']=id;
        delete user['password']
        res.json(user);
    });
});


userRouter.put('/updateUser/:id',function(req,res){
    var id=req.params.id;
    var updatedUser=req.body;
    connection.connect(function(err){});
    connection.query('UPDATE user SET email = ?,password = ?, first_name = ? , last_name = ? WHERE  id = ?', [updatedUser.email,
        updatedUser.password,updatedUser.first_name,updatedUser.last_name,id],function(err,result)
    {
        if (err) throw err;
        if(result.changedRows > 0){
            res.json({message: 'user data succussfully updated'})
        }else {
            res.json({message: 'failure on updated user data'});
        }
       
    } );
});


userRouter.delete('/deleteUser/:id',function(req,res){
    var id= req.params.id;
    connection.connect(function(err){});
    connection.query('delete from user where id = ?',[id],function(err,result)
    {
        if (err) throw err;
         if(result.affectedRows > 0){
            res.json({message: 'user is delete succussfully'})
        }else {
            res.json({message: 'failure on user delete'});
        }
      });
});


module.exports = userRouter;