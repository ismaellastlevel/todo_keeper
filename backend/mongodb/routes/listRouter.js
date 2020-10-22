const express=require('express');
let Router=express.Router();

const listController=require('../controllers/list');
// console.log(listController);

//collections operations
Router.get('/',listController.getLists);
Router.post('/',listController.addList);

//items operations
Router.get('/:listId',listController.getList);
Router.delete('/:listId',listController.removeList);
Router.post('/:listId',listController.updateList);
exports.Router=Router;

