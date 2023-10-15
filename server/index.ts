import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const dbPassword = process.env.DBPASSWORD;

app.get('/users', async (req: Request, res: Response) => {
  const dbConnection = await mongoose.connect(`mongodb+srv://lennardplas:${dbPassword}@barbilltracker.bhsjqsv.mongodb.net/?retryWrites=true&w=majority`)

  dbConnection.Collection('People').find({});

  res.send('Express + TypeScript Server Lets GOoo');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});