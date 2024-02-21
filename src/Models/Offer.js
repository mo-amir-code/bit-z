const mongoose = require("mongoose");
const {Schema} = mongoose;

const offerSchema = new Schema({
    sellerId: {type:String, required:true},
    buyerId: {type:String, required:true},
    sellerDmMsgId: {type:String},
    buyerDmMsgId: {type:String},
    listingId: {type:String, required:true},    
})

module.exports = new mongoose.model("Offer", offerSchema);