const express = require('express')
const jwt = require('jsonwebtoken')
const zod = require('zod')
const { JWT_SECRET } = require('../config')
const authmiddleware = require('../middleware')
const {User, Account} = require('../db')

//create a user router
const userRouter = express.Router()
///////////////////////////////////////////////////
//zod signup schema
const signupSchema = zod.object({
    userName : zod.string().email(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})
//get the post request data and create a new user using SIGNUP
userRouter.post('/signup', async(req,res)=>{
    const body = req.body;
    const { success } = signupSchema.safeParse(body) //validation of input
    if(!success){
        return  res.status(411).json({
            message: "Email already taken / Incorrect Inputs"
        })
    }
    console.log("input validated")
    //find the user in db
    const person = await User.findOne({
        userName : body.userName
    })
    if(person){
        return  res.status(411).json({
            message: "Email already taken / Incorrect Inputs"
        })
    }
    //if user not find in db, create a new one. 
    const dbuser = await User.create(body)
    const id = dbuser._id
    await Account.create({
        userId : id,
        balance : 1 + Math.random()*10000
    })
    console.log("created a new user and balance initialized")
    //jwt sign creation
    const jwt_token = jwt.sign({
        userId : dbuser._id
    },JWT_SECRET)

    //send the token as response
    res.status(200).json({
        message : "User created successfully!",
        token : jwt_token
    })
} )
///////////////////////////////////////////
//signin input validation Schema using zod
const signinSchema = zod.object({
    userName : zod.string().email(),
    password : zod.string()
})
//2. signin 
userRouter.post('/signin', async(req,res)=>{
    const body = req.body;
    const { success } = signinSchema.safeParse(body) //zod validation of input
    if(!success){
        return res.status(411).json({
            message : "User information invalid. Try giving sensible input."
        })
    }
    //search in db
    const exUser = await User.findOne({
        userName : body.userName,
        password : body.password
    })
    if(exUser){
        //return a jwt token for that user
        console.log("Logged in")
        const jwt_token = jwt.sign({
            userId : exUser._id
        },JWT_SECRET)

        res.status(200).json({
            message : "user found in db",
            token : jwt_token
        })
        return
    }
    return res.status(411).json({
        message : "Login Error"
    })
})
//////////////////////////////////////
//3. update user information
const updateSchema = zod.object({
    password : zod.string().optional(),
    firstName : zod.string().optional(),
    lastName : zod.string().optional()
})
userRouter.put('/', authmiddleware, async (req,res)=>{
    const { success } = updateSchema.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }
    //else update the infor using the userID from the header field added during auth
    const result = await User.updateOne(
        { _id: req.userId }, // Filter to select the document to update
        { $set: req.body }   // Fields to update //content to be updated, filter to select doc to update
        )
    if(result.modifiedCount > 0 ){
        res.status(200).json({
            message: "Updation successfull !"
        })
    }
    res.status(411).json({
        message: "No match found"
    })
})
////////////////////////////////////////////////
//4. This is needed so users can search for their friends and send them money
userRouter.get('/bulk', async(req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or :[
            {
                firstName : {
                    $regex :filter,
                }
            },
            {
                lastName : {
                    $regex :filter,
                }
            }
        ]
    })

    res.json({
        users: users.map( user =>({
            userName : user.userName,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    })
})

module.exports =  userRouter 