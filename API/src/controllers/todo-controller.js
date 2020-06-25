const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Todo = mongoose.model('Todo');

// list
exports.listTodo = async (req, res) => {
  try {
    const data = await Todo.find({}, 'usuarioId title description done');
    res.status(200).send(data);
  } catch (e) {
    res.status(500).send({message: 'Error when access To Dos'});
  }
};

// create
exports.createTodo = async (req, res) => {
    const {errors} = validationResult(req);

    if(errors.length > 0) {
        return res.status(400).send({message: errors})
    }

    try {
        const todo = new Todo({
            usuarioId: 0,
            title: req.body.title,
            description: req.body.description,
            done: false,
        });

        console.log(todo)

        await todo.save();

        res.status(201).send({message: 'To Do successfully created', data:todo});
    } catch (e) {
        res.status(500).send({message: 'Error when creating a new to do'});
        console.log(e);
    }
};

// update
exports.updateTodo = async(req,res) => {
    try{
        const filter = {_id: req.body._id} 

        const data = await Todo.findOneAndUpdate(filter,{
            title: req.body.title, 
            description: req.body.description,
            done: req.body.done,
        });

        await data.save();
        console.log(data);
        res.status(201).send({message: 'To Do successfully updated', data: data});
    }
    catch (e){
        res.status(500).send({message: 'Error when updating a to do'});
        console.log(e);
    }
}

exports.deleteTodo = async(req,res) => {
    try{
        await Todo.findByIdAndRemove(req.params.id)
        await Todo.save();
        res.status(201).send({message: 'To Do successfully deleted'});
    }catch (e){
        res.status(201).send({message: 'To Do successfully deleted'});
        console.log(e);
    }
}