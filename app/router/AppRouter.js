var express = require('express');
var userRouter=require('../controller/UserController');
var appRouter = express.Router();

appRouter.use('/user',userRouter);


module.exports = appRouter;