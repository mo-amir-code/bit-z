const mongoose = require("mongoose")
const {Schema} = mongoose;

const sellSchema = new Schema({
    msgId: {type:String, required:true},
    sellerId: {type:String, required:true},
    sold: {type:Boolean, required:true, default:false},
    isListed: {type:Boolean, required:true},
}, {timestamps:true});

module.exports = new mongoose.model("Sell", sellSchema);