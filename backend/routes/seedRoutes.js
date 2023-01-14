import express from "express";
import { categories, eventsUpload } from "../data/data.js";
import Category from "../models/CategoryModel.js";
import Events from "../models/EventModel.js";
import Payments from "../models/PaymentsModel.js";
const seedRouter = express.Router();

seedRouter.get("/",async(req,res)=>{
    await Events.deleteMany({});
    await Category.deleteMany({});
    await Payments.deleteMany({});
    const createEvents = await Events.insertMany(eventsUpload)
    const createCategories = await Category.insertMany(categories)
    res.send({createEvents, createCategories});
})

export default seedRouter;