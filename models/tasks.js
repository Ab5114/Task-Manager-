// models/taskSchema.js
const mongoose=require("mongoose");
const taskSchema = new mongoose.Schema({
 taskContent:{
    type:String,
    required:true
 },
 isCompleted:{
    type:Boolean,
    default:false,
 }
});
const tasks = mongoose.model("Task", taskSchema);


  module.exports=tasks;
