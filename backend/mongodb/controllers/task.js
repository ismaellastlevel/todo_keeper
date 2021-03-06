const Task = require('../models/task').Task;
const List = require('../models/list').List;

let getTasks = function (req, res) {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err));
}
let addTask = (req, res) => {
    let name = req.body.name;
    let isDone = req.body.isDone;
    let listId = req.body.listId;
    if (name && listId) {
        let tasks = [];
        let task = new Task({name, tasks, isDone});
        task.save((error, addedTask) => {
            if (!error) {
                List.findById(listId)
                    .then(list => {
                        console.log(list);
                        list.tasks = [...list.tasks, addedTask];
                        list.save().catch(err => console.log(err));
                        res.status(200).json({"message": "task added successfully", task: addedTask, list});
                    })
                    .catch(err => {
                        res.status(500).json({"message": "an error occurred"});
                        console.log(err)
                    });

            } else {
                console.log(error);
                res.status(400).json({error: error, message: "An error occurred while adding the new task"});
            }
        })

    } else {
        res.status(400).json({"message": "the task name or the listId field is empty"});
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
    let listId = req.body.listId;
    // console.log("req.params",req);
    Task.findByIdAndDelete(taskId)
        .then(task => {
            List.findById(listId)
                .then(list => {
                    list.tasks = list.tasks.filter((item) => {
                        return (String(item._id) !== String(task._id));
                    });
                    list.save().catch(err => console.log(err));
                    res.status(200).json({"message": "task removed successfully", task: task, list});
                })
                .catch(err => {
                    res.status(500).json({"message": "an error occurred"});
                    console.log(err);
                });
        })
        .catch(err => res.status(400).json('Error: ' + err));
}

let updateTask = (req, res) => {
    let name = req.body.name;
    let isDone = req.body.isDone;
    let {taskId} = (req.params);
    let listId = req.body.listId;
    if (name) {
        Task.findByIdAndUpdate(taskId, {name: name, isDone: isDone}, {upsert: true, new: true}, (error, result) => {
            if (!error) {
                // res.status(200).json({"message": "task updated successfully",task:result});
            } else {
                console.log(error);
                res.status(400).json({error: error, message: "An error occurred while updating the task"});
            }
        }).then((updatedTask) => {
            List.findById(listId)
                .then(list => {
                    list.tasks = list.tasks.filter((item) => {
                        return (String(item._id) !== String(updatedTask._id));
                    });
                    list.tasks.push(updatedTask);
                    list.save().catch(err => console.log(err));
                    res.status(200).json({"message": "task updated successfully", task: updatedTask, list});
                })
                .catch(err => {
                    res.status(500).json({"message": "an error occurred"});
                    console.log(err);
                });
        });

    } else {
        res.status(400).json({"message": "the task name field is empty"});
    }
}

//note: it seems i must add the 'module.' , otherwise it returns an error
module.exports = {getTasks, addTask, updateTask, getTask, removeTask}