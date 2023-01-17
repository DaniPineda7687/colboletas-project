import express from "express";
import { categories, eventsUpload, usersInfo } from "../data/data.js";
import Category from "../models/CategoryModel.js";
import Events from "../models/EventModel.js";
import Payments from "../models/PaymentsModel.js";
import User from "../models/UserModel.js";
const seedRouter = express.Router();

seedRouter.get("/",async(req,res)=>{
    await Events.deleteMany({});
    await Category.deleteMany({});
    await Payments.deleteMany({});
    await User.deleteMany({})
    const createEvents = await Events.insertMany(eventsUpload)
    const createCategories = await Category.insertMany(categories)
    const createUsers = await User.insertMany(usersInfo);
    res.send({createEvents, createCategories, createUsers});
})

export default seedRouter;