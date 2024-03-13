import express from 'express';
import { authenticateUser } from '../middlewares/auth';
import { closeCommute, createCommute, deleteCommute, getCommutes, getOpenCommute } from '../controllers/commute';

export const router = express.Router();

router.use(authenticateUser)

router.get('/', getCommutes);
router.get('/open', getOpenCommute);
router.post('/', createCommute);
router.delete('/:id', deleteCommute);
router.put('/close', closeCommute);
