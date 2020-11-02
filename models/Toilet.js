const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toiletSchema = new Schema({
name: String,
location: String,
description: String, 
user: [
  {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
],
lat: Number,
lng: Number,
locType: String,
genderNeutral: Boolean,
free: Boolean
  // comments: [
  //    {
  //   type: Schema.Types.ObjectId,
  //   ref: "Comment"
  //   }]
})



const Toilet = mongoose.model('Toilet', toiletSchema);
module.exports = Toilet;