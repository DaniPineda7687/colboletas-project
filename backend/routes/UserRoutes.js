import express from "express"
import User from "../models/UserModel.js";

const UserRouter = express.Router();

UserRouter.get("/login",async(req,res)=>{
    const email = req.query.email;
    const password = req.query.password;
    const emailFind = await User.findOne({email:email});
    if(emailFind){
        if(emailFind.password==password){
            const {name,lastName,username,email,isAdmin,birthday,image,_id} = emailFind; 
            res.send([{name,lastName,username,email,isAdmin,birthday,image,_id}]);
        }else{
            res.status(404).send("La contraseña no coincide")
        }
    }else{
        res.status(404).send("El email no se encuentra registrado")
    } 
})

UserRouter.get("/all",async(req,res)=>{
    const allUsers = await User.find({});
    res.send(allUsers);
})

UserRouter.post("/register",async(req,res)=>{
    const name = req.body.name;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const email = req.body.email;
    const birthday = req.body.birthday;
    const password = req.body.password;

    const verifyEmail = await User.findOne({email:email});
    const verifyUsername = await User.findOne({username:username});

    if(verifyEmail){
        res.status(404).send("El correo electronico ya se encuentra registrado");
    }else if(verifyUsername){
        res.status(404).send("El nombre de usuario no se encuentra disponible");
    }else{
        const register = await User.insertMany({
            name,
            lastName,
            username,
            email,
            birthday,
            password,
            image:"https://static.fundacion-affinity.org/cdn/farfuture/PVbbIC-0M9y4fPbbCsdvAD8bcjjtbFc0NSP3lRwlWcE/mtime:1643275542/sites/default/files/los-10-sonidos-principales-del-perro.jpg",
            isAdmin:false,
        })
        res.send(register);
    }


})




export default UserRouter;