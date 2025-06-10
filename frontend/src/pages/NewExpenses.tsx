import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material'
import {
  Menu as MenuIcon,
  CameraAlt,
  Add,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const NewExpenses = () => {
  const navigate = useNavigate()

  const handleScanReceipts = () => {
    // Simulate receipt scanning and navigate to expenses page
    console.log('Scan Receipts clicked')
    navigate('/expenses')
  }

  const handleAddExpense = () => {
    // Navigate to manual expense entry form
    console.log('Add Expense clicked')
    navigate('/add-expense')
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
      <Box sx={{ px: 3, py: 6 }}>
        {/* Centered Page Title */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              mb: 2
            }}
          >
            New Expenses
          </Typography>
        </Box>

        {/* Add New Expenses Section - Left Aligned */}
        <Box sx={{ maxWidth: 400 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 600,
              mb: 1,
              fontSize: '1.75rem'
            }}
          >
            Add new expenses
          </Typography>
          
          <Typography 
            variant="h6" 
            component="p" 
            color="text.secondary"
            sx={{ 
              mb: 4,
              fontWeight: 400
            }}
          >
            Add Expense
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CameraAlt />}
              onClick={handleScanReceipts}
              sx={{
                bgcolor: 'success.main',
                color: 'background.default',
                fontWeight: 'bold',
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'success.dark',
                },
              }}
            >
              Scan Receipts
            </Button>
            
            <Button
              variant="contained"
              size="large"
              startIcon={<Add />}
              onClick={handleAddExpense}
              sx={{
                bgcolor: 'success.main',
                color: 'background.default',
                fontWeight: 'bold',
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                textTransform: 'none',
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'success.dark',
                },
              }}
            >
              Add Expense
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default NewExpenses 