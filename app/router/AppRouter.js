var express = require('express');
var userRouter=require('../controller/UserJsonController');
var userDbRouter=require('../controller/UserDbController');
var userOrmRouter=require('../controller/UserOrmController');
var appRouter = express.Router();

appRouter.use('/user',userRouter);
appRouter.use('/dbUser',userDbRouter);
appRouter.use('/ormUser',userOrmRouter);


module.exports = appRouter;