import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import cors from 'cors';

import { router as peopleRouter } from './routes/people';

dotenv.config();

const app: Express = express();

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
export const API_KEY = process.env.API_KEY;

app.use('/people', peopleRouter);

app.listen(PORT, async () => {
  await connect(MONGO_URL as string);
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});