var express = require('express');
var userRouter=require('../controller/UserJsonController');
var userDbRouter=require('../controller/UserDbController');
var appRouter = express.Router();

appRouter.use('/user',userRouter);
appRouter.use('/dbUser',userDbRouter);


module.exports = appRouter;