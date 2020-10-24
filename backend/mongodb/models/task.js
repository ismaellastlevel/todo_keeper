const mongoose=require('mongoose');

//todo: see how we can make task unique n a given list
let TaskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        default:false,
        required: true
    }
});
let Task=new mongoose.model('Task',TaskSchema);
module.exports={Task,TaskSchema}
