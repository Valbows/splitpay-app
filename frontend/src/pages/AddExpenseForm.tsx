import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
  InputAdornment,
} from '@mui/material'
import {
  Menu as MenuIcon,
  AttachMoney,
  Save,
  ArrowBack,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const AddExpenseForm = () => {
  const navigate = useNavigate()
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    paidBy: '',
    splitWith: [] as string[],
  })

  const categories = ['Food', 'Travel', 'Entertainment', 'Utilities', 'Shopping', 'Health', 'Other']
  const members = ['You', 'Elara', 'Orion', 'Company']

  const handleInputChange = (field: string, value: string) => {
    setExpenseData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleMemberToggle = (member: string) => {
    setExpenseData(prev => ({
      ...prev,
      splitWith: prev.splitWith.includes(member)
        ? prev.splitWith.filter(m => m !== member)
        : [...prev.splitWith, member]
    }))
  }

  const handleSaveExpense = () => {
    // Validate form
    if (!expenseData.description || !expenseData.amount || !expenseData.category) {
      alert('Please fill in all required fields')
      return
    }
    
    // Save expense logic here
    console.log('Saving expense:', expenseData)
    
    // Navigate to expenses page to see the added expense
    navigate('/expenses')
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: 'background.paper',
          boxShadow: 'none',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ mr: 2, color: 'text.primary' }}
            onClick={() => navigate(-1)}
          >
            <ArrowBack />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #00ff88, #00cc66)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&::before': {
                  content: '"⚡"',
                  fontSize: '12px',
                }
              }}
            />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                color: 'text.primary', 
                fontWeight: 'bold',
                letterSpacing: '0.5px'
              }}
            >
              SplitPay
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ px: 3, py: 4, maxWidth: 600, mx: 'auto' }}>
        {/* Page Title */}
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            mb: 4,
            textAlign: 'center'
          }}
        >
          Add New Expense
        </Typography>

        <Card>
          <CardContent sx={{ p: 4 }}>
            {/* Expense Description */}
            <TextField
              fullWidth
              label="Expense Description"
              value={expenseData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              sx={{ mb: 3 }}
              placeholder="e.g., Dinner at restaurant"
              required
            />

            {/* Amount */}
            <TextField
              fullWidth
              label="Amount"
              type="number"
              value={expenseData.amount}
              onChange={(e) => handleInputChange('amount', e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              sx={{ mb: 3 }}
              placeholder="0.00"
              required
            />

            {/* Category */}
            <FormControl fullWidth sx={{ mb: 3 }} required>
              <InputLabel>Category</InputLabel>
              <Select
                value={expenseData.category}
                label="Category"
                onChange={(e) => handleInputChange('category', e.target.value)}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Date */}
            <TextField
              fullWidth
              label="Date"
              type="date"
              value={expenseData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              sx={{ mb: 3 }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Paid By */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Paid By</InputLabel>
              <Select
                value={expenseData.paidBy}
                label="Paid By"
                onChange={(e) => handleInputChange('paidBy', e.target.value)}
              >
                {members.map((member) => (
                  <MenuItem key={member} value={member}>
                    {member}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Split With */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
                Split with:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {members.map((member) => (
                  <Chip
                    key={member}
                    label={member}
                    onClick={() => handleMemberToggle(member)}
                    variant={expenseData.splitWith.includes(member) ? 'filled' : 'outlined'}
                    sx={{
                      bgcolor: expenseData.splitWith.includes(member) ? 'success.main' : 'transparent',
                      color: expenseData.splitWith.includes(member) ? 'background.default' : 'text.primary',
                      '&:hover': {
                        bgcolor: expenseData.splitWith.includes(member) ? 'success.dark' : 'action.hover',
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>

            {/* Save Button */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Save />}
              onClick={handleSaveExpense}
              sx={{
                bgcolor: 'success.main',
                color: 'background.default',
                fontWeight: 'bold',
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: 'success.dark',
                },
              }}
            >
              Save Expense
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default AddExpenseForm 