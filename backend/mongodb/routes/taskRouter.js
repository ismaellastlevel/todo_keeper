const express=require('express');
let Router=express.Router();
const taskController=require('../controllers/task');

//collections operations
Router.get('/',taskController.getTasks);
Router.post('/',taskController.addTask);

//items operations
Router.get('/:taskId',taskController.getTask);
Router.delete('/:taskId',taskController.removeTask);
Router.post('/:taskId',taskController.updateTask);

exports.Router=Router;