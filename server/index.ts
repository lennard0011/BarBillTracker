import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { Schema, model, connect } from 'mongoose';

dotenv.config();

const app: Express = express();
app.use(express.json())

const port = process.env.PORT;
const dbPassword = process.env.DBPASSWORD;

enum personRole {
  Landwerk,
  Waterwerk,
  Groendienst,
  Ondersteuning,
  Stam
}

type TPerson = {
  firstName: string;
  lastName: string;
  email: string;
  role?: personRole;
}

// 2. Create a Schema corresponding to the document interface.
const personSchema = new Schema<TPerson>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: false}
});

// 3. Create a Model.
const Person = model<TPerson>('Person', personSchema);

app.get('/people', async (req: Request, res: Response) => {
  const foundPeople = await Person.find();
  res.json(foundPeople);
});

app.post('/people', async (req: Request, res: Response) => {
  const personToCreate = req.body;
  const createdPerson = await Person.create(personToCreate);
  res.json(createdPerson);
});

app.listen(port, async () => {
  await connect(`mongodb+srv://lennardplas:${dbPassword}@barbilltracker.bhsjqsv.mongodb.net/?retryWrites=true&w=majority`)
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});