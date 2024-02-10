const express = require("express")
const authmiddleware = require('../middleware');
const {Account} = require("../db");
const { default: mongoose } = require("mongoose");

const accountRouter = express.Router()


//1. get user account balance
accountRouter.get('/balance', authmiddleware, async(req,res)=>{
    const acc = await Account.findOne({
        userId : req.userId
    })
    res.json({
        balance : acc.balance
    })
})

//2. endpoint for user to transfer money to another user
accountRouter.post('/transfer',authmiddleware, async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();

    //get the toUser and amount
    const { to, amount } = req.body;

    //check it toUser exists
    const toAcc = await Account.findOne({userId : to}).session(session)
    if(!toAcc){
        await session.abortTransaction();
        res.status(400).json({
            message : "Invalid account"
        })
    }
    //check if fromUser has sufficient balance
    const acc = await Account.findOne({ userId : req.userId }).session(session)
    if(!acc || acc.balance < amount){
        await session.abortTransaction();
        res.status(400).json({
            message : "Insufficient balance"
        })
    }
    //if everything is fine, transfer
    await Account.updateOne({userId:req.userId},{$inc :{ balance : -amount }}).session(session)
    await Account.updateOne({userId:to},{$inc :{ balance : amount }}).session(session)

    //commit the transaction
    await session.commitTransaction();
    res.json({
        message : "Transaction successfull !"
    })

})




module.exports = accountRouter