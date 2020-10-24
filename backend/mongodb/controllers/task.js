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
        let task = new Task({name, tasks,isDone});
        task.save((error, addedTask) => {
            if (!error) {
                if (listId.match(/^[0-9a-fA-F]{24}$/)) {
                    console.log("// Yes, it's a valid ObjectId, proceed with `findById` call.");
                }
                List.findById(listId)
                    .then(list => {
                        console.log(list);
                        list.tasks = [...list.tasks, addedTask];
                        list.save().catch(err => console.log(err));
                        res.status(200).json({"message": "task added successfully", newTask: addedTask});
                    })
                    .catch(err => {
                        res.status(500).json({"message": "an error occured"});
                        console.log(err)
                    });

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
        Task.findByIdAndUpdate(taskId, {name}, {upsert: true}, (error) => {
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
module.exports = {getTasks, addTask, updateTask, getTask, removeTask}