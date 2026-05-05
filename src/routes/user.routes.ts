import { Router } from 'express';
import { userController } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/:id', authMiddleware, userController.getById);
router.get('/', authMiddleware, userController.getAll);
router.patch('/:id/block', authMiddleware, userController.block);

export default router;