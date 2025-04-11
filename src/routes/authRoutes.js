import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js'

const router = express.Router();

// register a new user /auth/register
router.post("/register", (req, res)=>{
    // console.log(req.body)
    // res.sendStatus(201)
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8)
    try {
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?,?)`)
        const result = insertUser.run(username, hashedPassword)
        const defaultTodo = "Heyy, add your first To do"
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

        // creating a token
        const token = jwt.sign({ id:result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24h' })
        // responding with json
        res.json({ token })

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
        
    }
}) 

router.post('/login', (req,res)=>{
    const { username, password } = req.body;

    try {
        const getUser = db.prepare(`SELECT * FROM users WHERE username = ?`);
        const user = getUser.get(username)
        // early return with error message if no such user

        if (!user){
            return res.status(404).send( { message: "User not found." })}

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        // early return with error message is wrong password
        if(!passwordIsValid){
            return res.statusCode(401).send({ message:"Invalid Password"})
        }

        // after login sending the jwt token to the client
        const token = jwt.sign({id:user.id}, process.env.JWT_SECRET , {expiresIn: '24h'})
        res.json({token})

    } catch (error) {
        console.log(error.message);
        res.sendStatus(503).send( { message: "an error occured" })
    }
})

export default router;
