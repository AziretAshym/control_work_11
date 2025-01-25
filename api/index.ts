import express from 'express';
import cors from 'cors';
import usersRouter from "./routes/users";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/users', usersRouter);


const run = async () => {

    await  mongoose.connect('mongodb://localhost:27017/lalafo');

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on('exit', () => {
        mongoDb.disconnect();
    });

};

run().catch((e) => console.error(e));
