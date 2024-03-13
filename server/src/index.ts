import express, { Express } from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import cors from 'cors';

import { router as peopleRouter } from './routes/people';
import { router as commuteRouter } from './routes/commute';


dotenv.config();

const app: Express = express();

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use('/people', peopleRouter);
app.use('/commute', commuteRouter);


app.listen(PORT, async () => {
  await connect(MONGO_URL as string);
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});