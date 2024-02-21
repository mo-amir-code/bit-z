const mongoose = require("mongoose")
const {Schema} = mongoose;

const ticketSchema = new Schema({
    msgId: {type:String, required:true},
    sellerId: {type:String, required:true},
    buyerId: {type:String, required:true},
    isOpen: {type:Boolean, required:true},
}, {timestamps:true});

module.exports = new mongoose.model("Ticket", ticketSchema);