const mongoose=require('mongoose');
const task=require('./task');
const Schema = require("mongoose").Schema;
const TaskSchema=task.TaskSchema;
const Task=task.Task;

let ListSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    tasks:[{
        type:[Schema.Types.Mixed]
    }]
});
let List=new mongoose.model('List',ListSchema);

/**
 * @param {Task[] | Task}  tasks -
 * can take an array of tasks or one task instance
 */
const addTasks = (tasks) => {
    //const currentListTasks=this.tasks;
    if(Array.isArray(tasks)){
        //todo: map through and add
    }else{
        //todo:add
    }
};
/**
 * @param {Array} tasks -
 */
const removeTasks = (tasks) => {
    //todo
};


ListSchema.methods.addTasks=addTasks;
ListSchema.methods.addTasks=addTasks


exports.List=List;
