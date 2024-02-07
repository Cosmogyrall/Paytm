const express = require('express')
const userRouter = require( "./user")

//creating a main router 
const mainRouter = express.Router()
//forward requests coming to api/v1/user to userRouter
mainRouter.use('/user', userRouter)

 
module.exports = mainRouter