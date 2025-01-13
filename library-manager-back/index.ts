import express, { json } from "express";
import 'express-async-errors'
import cors from 'cors';
import { userRouter } from "./routers/user";
import { bookRouter } from "./routers/books";
import { rentalRouter } from "./routers/rentals";

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(json());

app.use('/user', userRouter);
app.use('/book', bookRouter);
app.use('/rental', rentalRouter);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001')
})