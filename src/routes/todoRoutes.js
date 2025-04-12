import express, { request } from 'express';
import db from '../db.js'

const router = express.Router();

// get todos for logged in users
router.get('/', (req, res)=>{
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
    const todos = getTodos.all(req.userId)
    
    res.json(todos)
})

// create a new todo
router.post('/', (req, res)=>{
    const { task } = req.body;
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
    const result = insertTodo.run(req.userId, task)
    res.json({id: result.lastInsertRowid, task, completed: 0})
})

// cUpdate a todo
router.put('/:id',(req,res)=>{
    const { completed } = req.body
    const { id } = req.params
    const updatedTodo = db.prepare(`UPDATE todos SET completed = ? WHERE id= ?`)
    updatedTodo.run(completed, id)

    res.json({message:"Todo completed"})
} )

// delete a todo
router.delete('/:id', (req,res)=>{
    const { id } = req.params;
    const userId  = req.userId;
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? and user_id = ?`)
    deleteTodo.run(id, userId)

    res.send( {message: "todo deleted"})
})

export default router;
