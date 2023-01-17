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
        claimed:false,
    }    
    const insertInfo = await Payments.insertMany(infoPayment);
    res.send(insertInfo);
})    

PaymentRoutes.get("/ticket/:paymentref",async(req,res)=>{
    const {paymentref}=req.params;
    const ticket = await Payments.find({paymentRef:paymentref})
    if(ticket){
        res.send(ticket);
    }else{
        res.status(404).send("Error, no se encontro el ticket")
    }
})
PaymentRoutes.put("/claimticket/:paymentref",async(req,res)=>{
    const{paymentref}=req.params;
    const filter = {paymentRef:paymentref};
    const update = {claimed:true}
    const updatePayment = await Payments.findOneAndUpdate(filter,update,{new:true});
    res.send(updatePayment);
    //res.send(paymentref)
})
export default PaymentRoutes;