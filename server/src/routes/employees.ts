import { Router } from 'express';
import { employeeController } from '../controllers/employeeController';
import { authMiddleware, roleMiddleware } from '../middleware/auth';

const router = Router();

router.get('/', authMiddleware, employeeController.getAll);
router.get('/:id', authMiddleware, employeeController.getById);
router.post('/', authMiddleware, roleMiddleware(['hr', 'company_admin', 'super_admin']), employeeController.create);
router.put('/:id', authMiddleware, roleMiddleware(['hr', 'company_admin', 'super_admin']), employeeController.update);

export default router;
