import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connect } from 'mongoose';
import cors from 'cors';

import Person from './models/Person';
import Product from './models/Product';
import { authenticateUser } from './auth/auth';

dotenv.config();

const app: Express = express();

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
export const API_KEY = process.env.API_KEY;

app.get('/people', authenticateUser, async (req: Request, res: Response) => {
  try {
    const foundPeople = await Person.find();
    res.json(foundPeople);
  } catch {
    res.status(400);
  }
});

app.get('/people/:id', authenticateUser, async (req: Request, res: Response) => {
  const id = req.params.id;
  const foundPeople = await Person.findById(id);
  res.json(foundPeople);
});

app.post('/people', authenticateUser, async (req: Request, res: Response) => {
  try {
    const personToCreate = req.body;
    const createdPerson = await Person.create(personToCreate);
    res.json(createdPerson);
  } catch {
    res.status(400);
  }
});

app.delete('/people/:id', authenticateUser, async (req: Request, res: Response) => {
  try {
    const personIdToDelete: string = req.params.id;
    const deletedPerson = await Person.findByIdAndDelete(personIdToDelete);
    res.json(deletedPerson);
  } catch {
    res.status(400);
  }
});

app.put('/people/:id', authenticateUser, async (req: Request, res: Response) => {
  try {
    const personIdToPut: string = req.params.id;
    const personUpdateDetails = req.body;
    const updatedPerson = await Person.findByIdAndUpdate(personIdToPut, personUpdateDetails, { new: true });
    res.json(updatedPerson);
  } catch {
    res.status(400);
  }
});

app.post('/people/:id/consumption', authenticateUser, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const foundPerson = await Person.findById(id);

    if (!foundPerson) {
      throw new Error('Person not found');
    }

    foundPerson.consumption.push(req.body);
    foundPerson.save();

    res.json(foundPerson.consumption);
  } catch {
    res.status(400);
  }
});

app.get('/people/:id/consumption', authenticateUser, async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const foundPerson = await Person.findById(id);

    if (!foundPerson) {
      throw new Error('Person not found');
    }

    res.json(foundPerson.consumption);
  } catch {
    res.status(400);
  }
});

app.post('/products', authenticateUser, async (req: Request, res: Response) => {
  try {
    const productToCreate = req.body;
    const createdProduct = await Product.create(productToCreate);
    res.json(createdProduct);
  } catch {
    res.status(400);
  }
})

app.get('/products', authenticateUser, async (req: Request, res: Response) => {	
  try {	
    const foundProducts = await Product.find();	
    res.json(foundProducts);	
  } catch {	
    res.status(400);	
  }	
});

app.get('/protected-route', authenticateUser, (req: Request, res: Response) => {
  res.json({ message: 'You are authenticated!' });
});

app.listen(PORT, async () => {
  await connect(MONGO_URL as string);
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});