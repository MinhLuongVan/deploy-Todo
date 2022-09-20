
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./router/auth')
const userRouter = require('./router/userRouter')
const todoRouter = require('./router/todoRouter')
const env = require("./utils/myVariable")
const app = express()
const MONGODB = env.MONGODB;
const CLIENT_HOST = env.CLIENT_HOST;

const corsOptions = {
    origin: CLIENT_HOST,
    credentials: true,
};

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())
//Router
app.use('/i1/auth',authRouter);
app.use('/i1/user',userRouter);
app.use('/td1/list',todoRouter);
const connectdb = async() => {
    try {
        await mongoose.connect(MONGODB) 
    } catch (error) {
        console.log("Kết nối thất bại");
    }
}
connectdb().then(() => {
    console.log("Kết nối thành công");
});
app.listen(8000,() => {
    console.log(`server run on 8000`);
});



