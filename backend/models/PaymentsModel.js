import moongose from "mongoose";

const paymentsSchema = moongose.Schema({
    eventId:String,
    userId:String,
    paymentId:String,
    paymentRef:String,
}); 

const Payments = moongose.model("Payments",paymentsSchema);
export default Payments;