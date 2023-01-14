import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    idCategory:String,
    name:String,
    icon:String,
})

const Category = mongoose.model("Category",categorySchema);
export default Category;