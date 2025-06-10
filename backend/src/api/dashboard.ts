import { Router } from 'express';
import pool from '../config/database';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const [
      balanceResult,
      groupsResult,
      pendingResult,
      settledResult
    ] = await Promise.all([
      // Total Balance
      pool.query(`
        SELECT COALESCE(SUM(amount), 0) as total_balance 
        FROM expenses
      `),
      // Active Groups
      pool.query(`
        SELECT COUNT(DISTINCT group_id) as active_groups 
        FROM group_members
      `),
      // Pending Actions
      pool.query(`
        SELECT COUNT(*) as pending_count 
        FROM expense_splits 
        WHERE amount > 0
      `),
      // Settled Payments
      pool.query(`
        SELECT COALESCE(SUM(amount), 0) as settled_amount 
        FROM expense_splits 
        WHERE amount = 0
      `)
    ]);

    res.json({
      totalBalance: parseFloat(balanceResult.rows[0].total_balance),
      activeGroups: parseInt(groupsResult.rows[0].active_groups, 10),
      pendingActions: parseInt(pendingResult.rows[0].pending_count, 10),
      settledPayments: parseFloat(settledResult.rows[0].settled_amount)
    });
  } catch (error) {
    console.error('Dashboard data error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

export default router; 