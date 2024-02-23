import express from 'express';
import { authenticateUser } from '../middlewares/auth';
import { createPerson, deletePerson, getPeople, getPerson, updatePerson } from '../controllers/people';

export const router = express.Router();

router.use(authenticateUser)

router.get('/', getPeople);
router.get('/:id', getPerson);
router.post('/', createPerson);
router.delete('/:id', deletePerson);
router.put('/:id', updatePerson);
