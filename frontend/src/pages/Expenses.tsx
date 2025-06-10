import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Divider,
} from '@mui/material'
import {
  Menu as MenuIcon,
  AutoAwesome,
  Edit,
  Add,
  Remove,
  MoreHoriz,
  Delete,
  KeyboardArrowDown,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Expenses = () => {
  const navigate = useNavigate()
  const [dateFilter, setDateFilter] = useState('Date')
  const [categoryFilter, setCategoryFilter] = useState('Category')
  const [groupFilter, setGroupFilter] = useState('Group')
  const [amountFilter, setAmountFilter] = useState('Amount')

  // Sample expense data
  const expenseEntries = [
    {
      id: 1,
      date: '2023-10-01',
      description: 'Dinner at Luigi\'s',
      category: 'Food',
      amount: 45.67,
      status: 'processed'
    },
    {
      id: 2,
      date: '2023-10-02',
      description: 'Uber Ride',
      category: 'Travel',
      amount: 18.50,
      status: 'processed'
    },
    {
      id: 3,
      date: '2023-10-03',
      description: 'Groceries at Walmart',
      category: 'Food',
      amount: 87.23,
      status: 'processed'
    },
    {
      id: 4,
      date: '2023-10-04',
      description: 'Netflix Subscription',
      category: 'Entertainment',
      amount: 15.99,
      status: 'processed'
    },
    {
      id: 5,
      date: '2023-10-05',
      description: 'Coffee at Starbucks',
      category: 'Food',
      amount: 5.75,
      status: 'processed'
    },
    {
      id: 6,
      date: '2023-10-06',
      description: 'Gym Membership',
      category: 'Health',
      amount: 29.99,
      status: 'processed'
    },
  ]

  const memberTags = ['You', 'Elara', 'Orion', 'Company']

  const handleAISorting = () => {
    console.log('AI Sorting clicked')
  }

  const handleEditDetails = () => {
    console.log('Edit Details clicked')
  }

  const handleConfirm = () => {
    console.log('Confirm expenses')
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
            onClick={() => navigate('/dashboard')}
          >
            <MenuIcon />
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
      <Box sx={{ px: 3, py: 4 }}>
        {/* Centered Page Title */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2
            }}
          >
            Expenses
          </Typography>
        </Box>

        {/* Receipt Scan Preview */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              width: '100%',
              maxWidth: 600,
              height: 250,
              borderRadius: 2,
              overflow: 'hidden',
              border: 1,
              borderColor: 'divider',
              background: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 250"><rect width="600" height="250" fill="%23f5f5f5"/><text x="50" y="40" font-family="monospace" font-size="16" fill="%23333">RESTAURANT RECEIPT</text><text x="50" y="65" font-family="monospace" font-size="12" fill="%23666">CHARGES</text><text x="50" y="90" font-family="monospace" font-size="14" fill="%23333">Mixed Entrees £9   £201...280.5</text><text x="50" y="110" font-family="monospace" font-size="14" fill="%23333">18/03/2024 02:00%   110.0</text><text x="50" y="140" font-family="monospace" font-size="14" fill="%23333">Service Charge   25.5</text><text x="50" y="170" font-family="monospace" font-size="16" fill="%23333">TOTAL: £316.0</text></svg>')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.7 }}>
              Receipt Preview
            </Typography>
          </Box>
        </Box>

        {/* Edit Expenses Section */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 600,
              mb: 1,
              fontSize: '1.75rem'
            }}
          >
            Edit expenses
          </Typography>
          
          <Typography 
            variant="h6" 
            component="p" 
            color="text.secondary"
            sx={{ 
              mb: 3,
              fontWeight: 400
            }}
          >
            Add Expense
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<AutoAwesome />}
              onClick={handleAISorting}
              sx={{
                bgcolor: 'success.main',
                color: 'background.default',
                fontWeight: 'bold',
                py: 1.5,
                px: 4,
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'success.dark',
                },
              }}
            >
              AI Sorting
            </Button>
            
            <Button
              variant="contained"
              size="large"
              startIcon={<Edit />}
              onClick={handleEditDetails}
              sx={{
                bgcolor: 'success.main',
                color: 'background.default',
                fontWeight: 'bold',
                py: 1.5,
                px: 4,
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'success.dark',
                },
              }}
            >
              Edit Details
            </Button>
          </Box>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" color="text.secondary">
                  Total Expenses
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small">
                    <Remove />
                  </IconButton>
                  <IconButton size="small">
                    <Add />
                  </IconButton>
                  <IconButton size="small">
                    <MoreHoriz />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                $1,245.32
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Category Breakdown
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                See Pie Chart
              </Typography>
              <Typography variant="body2" color="text.secondary">
                N/A
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Expense Filters */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              displayEmpty
            >
              <MenuItem value="Date">Date <KeyboardArrowDown /></MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              displayEmpty
            >
              <MenuItem value="Category">Category <KeyboardArrowDown /></MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 100 }}>
            <Select
              value={groupFilter}
              onChange={(e) => setGroupFilter(e.target.value)}
              displayEmpty
            >
              <MenuItem value="Group">Group <KeyboardArrowDown /></MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <Select
              value={amountFilter}
              onChange={(e) => setAmountFilter(e.target.value)}
              displayEmpty
            >
              <MenuItem value="Amount">Amount <KeyboardArrowDown /></MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flexGrow: 1 }} />
          
          <IconButton color="error">
            <Delete />
          </IconButton>
        </Box>

        {/* Expense Entries List */}
        <Box sx={{ mb: 4 }}>
          {expenseEntries.map((expense, index) => (
            <Card 
              key={expense.id} 
              sx={{ 
                mb: 2, 
                bgcolor: 'grey.900',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: 'grey.800',
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
              onClick={() => navigate(`/split/${expense.id}`)}
            >
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {expense.date}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 1 }}>
                      {expense.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {expense.category}
                    </Typography>
                  </Box>
                  
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    ${expense.amount.toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {memberTags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: 'success.main',
                          color: 'background.default',
                          fontWeight: 500,
                        }}
                      />
                    ))}
                  </Box>

                  <IconButton 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log('Options menu clicked')
                    }}
                  >
                    <MoreHoriz />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* Confirm Button */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleConfirm}
            sx={{
              bgcolor: 'grey.300',
              color: 'text.primary',
              fontWeight: 'bold',
              py: 1.5,
              px: 6,
              fontSize: '1.1rem',
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                bgcolor: 'grey.400',
              },
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Expenses 