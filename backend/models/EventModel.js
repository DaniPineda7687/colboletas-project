import mongoose from "mongoose";

const eventSchema=mongoose.Schema({
    name:String,
    organizer:String,
    date:Date,
    participants:Number,
    totalTickets:Number,
    direction:String,
    placeId:String,
    category:Array,
    image:String,
    place:String,
    city:String,
    hour:String,
    minimAge:Number,
    ticketPrice:Number,
    coords:Array
})

const Events = mongoose.model("Events",eventSchema);
export default Events;