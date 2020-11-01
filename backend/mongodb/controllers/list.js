const List = require('../models/list').List;

let getLists = function (req, res) {
    List.find()
        .then(lists => res.json(lists))
        .catch(err => res.status(400).json('Error: ' + err));
}
let addList = (req, res) => {
    let name = req.body.name;
    let color = req.body.color;
    if (name) {
        let tasks = [];
        let list = new List({name, tasks,color});
        list.save((error, addedList) => {
            if (!error) {
                res.status(200).json({"message": "list added successfully",newList:addedList});
            } else {
                console.log(error);
                res.status(400).json({error: error, message: "An error occurred while adding the new list"});
            }
        })
    } else {
        res.status(400).json({"message": "the list name field is empty"});
    }
}

let getList = (req, res) => {
    let {listId} = req.params;
    List.findById(listId)
        .then(list => res.json(list))
        .catch(err => res.status(400).json('Error: ' + err));
}
let removeList = (req, res) => {
    let {listId} = req.params;
    List.findByIdAndDelete(listId)
        .then(list => res.json(list))
        .catch(err => res.status(400).json('Error: ' + err));
}
let updateList = (req, res) => {
    let name = req.body.name;
    let color = req.body.color;
    let {listId} = req.params;
    if (name) {
        List.findByIdAndUpdate(listId, {name,color},{ upsert: true, new: true }, (error, result) => {
            if (!error) {
                res.status(200).json({"message": "list updated successfully",list:result});
            } else {
                console.log(error);
                res.status(400).json({error: error, message: "An error occurred while updating the list"});
            }
        })
    } else {
        res.status(400).json({"message": "the list name field is empty"});
    }
}

//note: it seems i must add the 'module.' , otherwise it returns an error
module.exports = {getLists, addList, updateList, getList, removeList}