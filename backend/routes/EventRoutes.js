import express from "express"
import Events from "../models/EventModel.js";

const EventRouter = express.Router();

EventRouter.get("/",async(req,res)=>{
    const allEvents = await Events.find({});
    res.send(allEvents);
})

EventRouter.get("/popular",async(req,res)=>{
    const popularEvents = await Events.find({participants:{$gte:2000}});
    if(!req.query.limit){
        res.send(popularEvents);
    }else{
        res.send(popularEvents.slice(0,req.query.limit));
        
    }
})


EventRouter.get("/category/:idCategory",async(req,res)=>{
    const {idCategory} = req.params;
    const eventsFind = await Events.find({category:{$all:[idCategory]}});
    res.send(eventsFind);
})

EventRouter.get("/search",async(req,res)=>{
    if(req.query.query){
        
        const eventSearched = await Events.find({name:{ "$regex": `${req.query.query}`, "$options": "i" }})
        res.send(eventSearched);
    }else{
        res.send("Error")
    }
})
EventRouter.get("/searchid",async(req,res)=>{
    if(req.query.id){
        const event = await Events.findById(req.query.id);
        res.send(event);
    }else{
        res.send("Error")
    }
})

export default EventRouter;