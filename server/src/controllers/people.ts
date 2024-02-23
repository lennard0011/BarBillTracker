import { Request, Response } from 'express';
import { PersonModel } from "../models/Person";
import PeopleService from '../services/people';

const peopleService = new PeopleService();

export async function getPeople(_: Request, res: Response) {
    try {
        const foundPeople = peopleService.get();
        res.json(foundPeople);
    } catch {
        res.status(400);
    }
}

export async function getPerson(req: Request, res: Response) {
    const id = req.params.id;
    const foundPeople = peopleService.get(id);
    res.json(foundPeople);
}

export async function createPerson(req: Request, res: Response) {
    try {
        const personToCreate = req.body;
        const createdPerson = await PersonModel.create(personToCreate);
        res.json(createdPerson);
    } catch {
        res.status(400);
    }
}

export async function deletePerson(req: Request, res: Response) {
    try {
        const personIdToDelete: string = req.params.id;
        const deletedPerson = await PersonModel.findByIdAndDelete(personIdToDelete);
        res.json(deletedPerson);
    } catch {
        res.status(400);
    }
}

export async function updatePerson(req: Request, res: Response) {
    try {
        const personIdToPut: string = req.params.id;
        const personUpdateDetails = req.body;
        const updatedPerson = await PersonModel.findByIdAndUpdate(personIdToPut, personUpdateDetails, { new: true });
        res.json(updatedPerson);
    } catch {
        res.status(400);
    }
}