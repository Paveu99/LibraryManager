import express, { json } from "express";
import 'express-async-errors'
import cors from 'cors';
import { userRouter } from "./routers/user";

const app = express()

// app.use(cors({
//     origin: 'http://localhost:3000'
// }));

app.use(json());

app.use('/user', userRouter)

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})