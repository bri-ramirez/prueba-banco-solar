import { Router } from 'express';
import userRoutes from './user.routes.js';
import transferRoutes from './transfer.routes.js';

const router = Router();

router.use('/usuario', userRoutes);
router.use('/transferencia', transferRoutes);

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

export default router;
