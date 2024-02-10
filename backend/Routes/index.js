const express = require('express')
const userRouter = require( "./user")
const accountRouter = require("./account")

//creating a main router 
const mainRouter = express.Router()
//forward requests coming to api/v1/user to userRouter
mainRouter.use('/user', userRouter)
mainRouter.use('/account',accountRouter)
 
module.exports = mainRouter