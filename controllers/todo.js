const Todo = require('../models/todo');


let createTodo = (req, res, next) =>{
    console.log(req.body);
    let todoText = req.body.todoText,
        todoDesc = req.body.todoDesc;
    
    let toDo = new Todo({
        todoText: todoText,
        todoDesc: todoDesc
    });

    toDo.save((err, todo)=>{
        if(err)
            return res.status(401).json({
                message: err,
                success: false
            })
            else{
                return res.status(200).json({
                    success: true,
                    todo: todo
                })
            }
    })
}

let getAllTodo = (req, res, next)=>{
    Todo.find((err, todo)=>{
        if(err)
        {
            return res.status(400).json({
                success: false,
                message: err
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                todos: todo
            })
        }
    })
}

let getSingleTodo = (req, res, next)=>{
    Todo.findById(req.params.id, (err, todo)=>{
        if(err) {
            console.log('Here the error' + err);
            return res.status(400).json({
                success: false,
                message: err
            })
        }
        else{
            return res.status(200).json({
                success: true,
                todo: todo
            })
        }
    })
}

let deleteTodo = (req, res, next) =>{
    Todo.findByIdAndRemove(req.params.id, (err)=>{
        if(err)
            return res.status(400).json({
                success: false,
                message: err
            })
        else
            return res.status(200).json({
                success: true,
                message: "Todo delete"
            })
    })
}

let updateTodo = (req, res, next)=>{
    Todo.findById(req.params.id, (err, todo)=>{
        if(err) {
            console.log('Here the error' + err);
            return res.status(400).json({
                success: false,
                message: err
            })
        }
        else{
            let todoText = req.body.todoText,
                todoDesc = req.body.todoDesc;

            todo.todoText = todoText || todo.todoText;
            todo.todoDesc = todoDesc || todo.todoDesc;

            todo.save((err, todo)=>{
                if(err){
                    return res.status(400).json({
                        success: false,
                        message: err
                    })
                }else{
                    return res.status(200).json({
                        success: true,
                        todo: todo
                    })
                }
            })
        }
    })
}

module.exports = {
    createTodo,
    getAllTodo,
    getSingleTodo,
    deleteTodo,
    updateTodo
}