import mongoose from "mongoose"

const userSchema = mongoose.Schema({
    name:String,
    lastName:String,
    username:String,
    image:String,
    email:String,
    password:String,
    birthday:Date,
    isAdmin:Boolean,
})

const User = mongoose.model("User", userSchema);
export default User;
