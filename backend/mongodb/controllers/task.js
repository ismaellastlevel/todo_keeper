const Task = require('../models/task').Task;

let getTasks = function (req, res) {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
}
let addTask = (req, res) => {
    let name = req.body.name;
    if (name) {
        let tasks = [];
        let task = new Task({name, tasks});
        task.save((error, addedTask) => {
            if (!error) {
                res.status(200).json({"message": "task added successfully"});
            } else {
                console.log(error);
                res.status(400).json({error: error, message: "An error occurred while adding the new task"});
            }
        })

    } else {
        res.status(400).json({"message": "the task name field is empty"});
    }
}

let getTask = (req, res) => {
    let {taskId} = (req.params);
    Task.findById(taskId)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
}
let removeTask = (req, res) => {
    let {taskId} = (req.params);
    Task.findByIdAndDelete(taskId)
        .then(task => res.json(task))
        .catch(err => res.status(400).json('Error: ' + err));
}
let updateTask = (req, res) => {
    let name = req.body.name;
    let {taskId} = (req.params);
    if (name) {
        Task.findByIdAndUpdate(taskId, {name},{ upsert: true }, (error) => {
            if (!error) {
                res.status(200).json({"message": "task updated successfully"});
            } else {
                console.log(error);
                res.status(400).json({error: error, message: "An error occurred while updating the task"});
            }
        })
    } else {
        res.status(400).json({"message": "the task name field is empty"});
    }
}

//note: it seems i must add the 'module.' , otherwise it returns an error
module.exports ={getTasks,addTask,updateTask,getTask,removeTask}