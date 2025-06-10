import express from 'express';
import pool from '../config/database';
import upload from '../utils/upload';

const router = express.Router();

// GET /api/expenses - Get all expenses (optionally filtered by group)
router.get('/', async (req, res) => {
  try {
    const { groupId } = req.query;
    let query = 'SELECT * FROM expenses ORDER BY created_at DESC';
    let params: any[] = [];
    
    if (groupId) {
      query = 'SELECT * FROM expenses WHERE group_id = $1 ORDER BY created_at DESC';
      params = [groupId];
    }
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching expenses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/expenses/:id - Get a specific expense
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM expenses WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/expenses - Create a new expense
router.post('/', async (req, res) => {
  try {
    const { description, amount, group_id, paid_by_user_id } = req.body;
    
    if (!description || !amount || !group_id || !paid_by_user_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const result = await pool.query(
      'INSERT INTO expenses (description, amount, group_id, paid_by_user_id, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [description, amount, group_id, paid_by_user_id]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/expenses/:id/receipt - Upload expense receipt
router.post('/:id/receipt', upload.single('receipt'), async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    const receiptUrl = `/uploads/${req.file.filename}`;

    const result = await pool.query(
      'UPDATE expenses SET receipt_url = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [receiptUrl, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error uploading receipt:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/expenses/:id - Update an expense
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount } = req.body;
    
    const result = await pool.query(
      'UPDATE expenses SET description = $1, amount = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [description, amount, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error updating expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/expenses/:id - Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM expenses WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    console.error('Error deleting expense:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 