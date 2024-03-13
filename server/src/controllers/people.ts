import { Request, Response } from 'express';
import PeopleService, { CreatePersonDto } from '../services/people';

const peopleService = new PeopleService();

export async function getPeople(_: Request, res: Response) {
    try {
        const foundPeople = await peopleService.get();
        res.json(foundPeople);
    } catch {
        res.status(400);
    }
    res.send();
}

export async function getPerson(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const foundPeople = await peopleService.get(id);
        res.json(foundPeople);
    } catch {
        res.status(400);
    }
    res.send();
}

export async function createPerson(req: Request, res: Response) {
    try {
        const personToCreate = req.body;
        const id = await peopleService.create(personToCreate);
        res.json({ id });
    } catch {
        res.status(400);
    }
    res.send();
}

export async function deletePerson(req: Request, res: Response) {
    try {
        const personIdToDelete: string = req.params.id;
        await peopleService.delete(personIdToDelete);
        res.status(200);
    } catch {
        res.status(400);
    }
    res.send();
}

export async function updatePerson(req: Request, res: Response) {
    try {
        const personIdToPut: string = req.params.id;
        const personUpdateDetails = req.body;
        await peopleService.update(personIdToPut, personUpdateDetails);
        res.status(200);
    } catch {
        res.status(400);
    }
    res.send();
}