import { Router } from 'express';
import {
  create,
  getAll,
} from '../controllers/transfer.controller.js';

const router = Router();

router.get('/', getAll);
router.post('/', create);

export default router;