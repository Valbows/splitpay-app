import express from 'express';
import groupsRoutes from './groups';
import expensesRoutes from './expenses';
import usersRoutes from './users';

const router = express.Router();

// Mount route handlers
router.use('/groups', groupsRoutes);
router.use('/expenses', expensesRoutes);
router.use('/users', usersRoutes);

export default router;
