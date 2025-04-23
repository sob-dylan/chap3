import express from 'express';
import prisma from '../prismaClient';

const router = express.Router();

// get todos for logged in users
router.get('/', async(req, res)=>{
    const todos  = await prisma.todo.findMany({
        where:{
            UserId: req.userId
        }
    })


    res.json(todos)
})

// create a new todo
router.post('/', async(req, res)=>{
    const todo = await prisma.todo.create({
        data:{
            task,
            userId: req.userId
        }
    })

    res.json(todo)
})

// cUpdate a todo
router.put('/:id',async(req,res)=>{
    const { completed } = req.body
    const { id } = req.params

    const updatedtodo = await prisma.todo.update({
        where:{
            id: parseInt(id),
            userId: req.userId
        },
        data:{
            completed: !!completed
        }
    })
} )

// delete a todo
router.delete('/:id', async(req,res)=>{
    const { id } = req.params;
    const userId = req.userId

    await prisma.todo.delete({
        where:{
            id: parseInt(id),
            userId
        }
    })
})

export default router;
