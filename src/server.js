import express from 'express';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from './routes/todoRoutes.js';
import authMiddleware from './middleware/authMiddleware.js';

const app = express();
const PORT = process.env.PORT ||3001

// Get file path from url of the current module
const __filename = fileURLToPath(import.meta.url)
// Get the directory name from the file path
const __dirname = dirname(__filename);


app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})


// static file middleware 
app.use(express.json());
app.use(express.static(path.join(__dirname,'../public')));

//Routes
app.use('/auth', authRoutes)
app.use('/todos',authMiddleware, todoRoutes)


// listen on port exposed
app.listen(PORT, ()=>{
    console.log(`the server has started on port; ${PORT}`)
})