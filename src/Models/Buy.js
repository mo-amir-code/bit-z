const mongoose = require("mongoose")
const {Schema} = mongoose;

const buySchema = new Schema({
    msgId: {type:String, required:true},
    buyerId: {type:String, required:true},
    sold: {type:Boolean, required:true, default:false},
    isListed: {type:Boolean, required:true},
}, {timestamps:true});

module.exports = new mongoose.model("Buy", buySchema);