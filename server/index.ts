import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import cors from 'cors';

import Person from './models/Person';

dotenv.config();

const app: Express = express(); 
//test 

app.use(cors())
app.use(express.json())


const port = process.env.PORT;
const dbPassword = process.env.DBPASSWORD;

app.get('/people', async (req: Request, res: Response) => {
  const foundPeople = await Person.find(); 
  res.json(foundPeople); 
});

app.post('/people', async (req: Request, res: Response) => {
  const personToCreate = req.body;
  const createdPerson = await Person.create(personToCreate);
  res.json(createdPerson);
});

app.delete('/people', async (req: Request, res: Response) => {
  const personIdToDelete: string = req.body.id;
  const deletedPerson = await Person.findByIdAndDelete(personIdToDelete);
  res.json(deletedPerson);
});

app.listen(port, async () => {
  await connect(`mongodb+srv://lennardplas:${dbPassword}@barbilltracker.bhsjqsv.mongodb.net/barBillTracker?retryWrites=true&w=majority`)
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`); 
});