import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import EventRouter from "./routes/EventRoutes.js";
import cors from "cors";
import CategoryRouter from "./routes/CategoryRoutes.js";
import PaymentRoutes from "./routes/PaymentRoutes.js";
import bodyParser from "body-parser";
import UserRouter from "./routes/UserRoutes.js";
dotenv.config();
mongoose.connect(process.env.ATLAS_URI)
    .then(()=>{
        console.log("Conectado con exito a la bd")
    })
    .catch((err)=>{
        console.log("Error al conectar la bd",err)
    })


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
const port = 3000;
app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.use("/api/seed",seedRouter);
app.use("/api/events",EventRouter);
app.use("/api/categories",CategoryRouter);
app.use("/api/payments",PaymentRoutes);
app.use("/api/users",UserRouter);
app.listen(port,()=>{
    console.log("Escuchando en el puerto: ", port);
})