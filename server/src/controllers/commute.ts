import { Request, Response } from 'express';
import CommuteService from '../services/commute';

const commuteService = new CommuteService();

export async function getCommutes(_: Request, res: Response) {
    try {
        const commutes = await commuteService.get();
        res.json(commutes);
    } catch {
        res.status(400);
    }
    res.send();
}

export async function getOpenCommute(_: Request, res: Response) {
    try {
        const openCommute = await commuteService.getOpenCommute();
        res.json(openCommute);
    } catch {
        res.status(400);
    }
    res.send();
}

export async function createCommute(_: Request, res: Response) {
    try {
        const id = await commuteService.create();
        res.json({ id });
    } catch {
        res.status(400);
    }
    res.send();
}

export async function closeCommute(_: Request, res: Response) {
    try {
        await commuteService.closeCommute();
        res.status(200);
    } catch {
        res.status(400);
    }
    res.send();
}

export async function deleteCommute(req: Request, res: Response) {
    try {
        const id = req.params.id;
        await commuteService.delete(id);
        res.status(200);
    } catch {
        res.status(400);
    }
    res.send();
}