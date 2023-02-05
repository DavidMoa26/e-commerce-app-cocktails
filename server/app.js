import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRouter.js'
import userRoutes from "./routes/userRouter.js"
import orderRoutes from './routes/orderRoutes.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors())


var jsonParser = bodyParser.json()


dotenv.config();

connectDB();




app.get('/', (req, res) => {
    res.send('Server..')
})

app.use('/api/products', productRoutes)
app.use('/api/user', jsonParser, userRoutes)
app.use('/api/orders', jsonParser, orderRoutes)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});