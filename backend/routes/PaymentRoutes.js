import express from "express";
import mongoose from "mongoose";
import Payments from "../models/PaymentsModel.js";

const PaymentRoutes = express.Router();

PaymentRoutes.get("/",async(req,res)=>{
    const data = await Payments.find({});
    res.send(data);
})

PaymentRoutes.get("/user/:userid",async(req,res)=>{
    const{userid}=req.params;
    const payments = await Payments.find({userId:userid})
    res.send(payments)
})

PaymentRoutes.post("/register",async(req,res)=>{
    const infoPayment = {
        eventId: req.body.eventId,
        userId: req.body.userId,
        paymentId: req.body.paymentId,
        paymentRef: req.body.paymentRef,
    }    
    const insertInfo = await Payments.insertMany(infoPayment);
    res.send(insertInfo);
})    


export default PaymentRoutes;