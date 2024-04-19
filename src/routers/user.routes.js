import { Router } from 'express';
import {
  create,
  getAll,
  updateById,
  deleteById,
} from '../controllers/user.controller.js';

const router = Router();

router.get('/', getAll);
router.post('/', create);
router.put('/', updateById);
router.delete('/', deleteById);

export default router;
