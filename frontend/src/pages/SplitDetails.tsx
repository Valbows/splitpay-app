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
  Grid,
  TextField,
  Chip,
  Avatar,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Edit,
  Delete,
  Check,
} from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'

const SplitDetails = () => {
  const navigate = useNavigate()
  const { expenseId } = useParams()
  const [notes, setNotes] = useState('')

  // Sample split data
  const splitData = {
    id: expenseId,
    title: 'Restaurant Dinner',
    totalAmount: 120.50,
    corporate: {
      name: 'Corporate',
      amount: 120.50,
      status: 'paid'
    },
    splits: [
      {
        id: 1,
        name: 'Corporate',
        amount: 120.50,
        status: 'paid'
      },
      {
        id: 2,
        name: 'Liam Nyx',
        amount: 40.00,
        status: 'pending'
      },
      {
        id: 3,
        name: 'Orion Voss',
        amount: 40.00,
        status: 'pending'
      }
    ],
    members: [
      {
        id: 1,
        name: 'Elara Nyx',
        amount: 40,
        status: 'pending'
      },
      {
        id: 2,
        name: 'Elara Nyx',
        amount: 40,
        status: 'pending'
      },
      {
        id: 3,
        name: 'Elara Owes',
        amount: 40,
        status: 'pending'
      },
      {
        id: 4,
        name: 'Elara Owes',
        amount: 40,
        status: 'pending'
      }
    ]
  }

  const handleMarkPaid = (memberId: number) => {
    console.log('Mark as paid:', memberId)
  }

  const handleEdit = (memberId: number) => {
    console.log('Edit member split:', memberId)
  }

  const handleDelete = (memberId: number) => {
    console.log('Delete member split:', memberId)
  }

  const handleSelect = (splitId: number) => {
    console.log('Select split:', splitId)
  }

  const handleViewDetails = () => {
    console.log('View settlement details')
  }

  const handleSettle = () => {
    console.log('Settle transaction')
  }

  const handleLogout = () => {
    console.log('Logout')
    // Add logout logic here
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
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1 }}>
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

          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              bgcolor: 'success.main',
              color: 'background.default',
              '&:hover': { bgcolor: 'success.dark' }
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            {/* Split Details Header */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
              <Typography variant="h3" component="h1" sx={{ fontWeight: 'bold' }}>
                Split Details
              </Typography>
              
              <Card sx={{ minWidth: 200 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {splitData.corporate.name}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', my: 1 }}>
                    ${splitData.corporate.amount.toFixed(2)}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: 'success.main',
                        color: 'background.default',
                        '&:hover': { bgcolor: 'success.dark' }
                      }}
                    >
                      Paid
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{
                        bgcolor: 'success.main',
                        color: 'background.default',
                        '&:hover': { bgcolor: 'success.dark' }
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="text"
                      fullWidth
                      sx={{ color: 'text.secondary' }}
                    >
                      Delete
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Split Bill Section */}
            <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
              Split Bill
            </Typography>

            <Grid container spacing={2} sx={{ mb: 4 }}>
              {splitData.splits.map((split) => (
                <Grid item xs={12} md={4} key={split.id}>
                  <Card sx={{ textAlign: 'center', height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {split.name}
                      </Typography>
                      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                        ${split.amount.toFixed(2)}
                      </Typography>
                      
                      {split.status === 'paid' ? (
                        <Chip
                          label="Paid"
                          sx={{
                            bgcolor: 'success.main',
                            color: 'background.default',
                            fontWeight: 600
                          }}
                        />
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => handleSelect(split.id)}
                          sx={{
                            bgcolor: 'success.main',
                            color: 'background.default',
                            '&:hover': { bgcolor: 'success.dark' }
                          }}
                        >
                          Select
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Status and Amount Summary */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Status
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  Amount
                </Typography>
              </Grid>
              
              {splitData.splits.map((split) => (
                <Grid container spacing={2} key={split.id} sx={{ mt: 1 }}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      {split.status === 'paid' ? 'Paid' : 'Pending'}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      ${split.amount.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {/* Receipt Preview */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <Box
                  sx={{
                    height: 300,
                    background: `url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 300"><rect width="600" height="300" fill="%23f5f5f5"/><text x="50" y="40" font-family="monospace" font-size="16" fill="%23333">RESTAURANT RECEIPT</text><text x="50" y="65" font-family="monospace" font-size="12" fill="%23666">CHARGES</text><text x="50" y="90" font-family="monospace" font-size="14" fill="%23333">Mixed Entrees £9   £201...280.5</text><text x="50" y="110" font-family="monospace" font-size="14" fill="%23333">18/03/2024 02:00%   110.0</text><text x="50" y="140" font-family="monospace" font-size="14" fill="%23333">Service Charge   25.5</text><text x="50" y="170" font-family="monospace" font-size="16" fill="%23333">TOTAL: £316.0</text></svg>')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: 1,
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, p: 2 }}>
                  {[0, 1, 2, 3, 4].map((dot, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: index === 0 ? 'success.main' : 'grey.500',
                      }}
                    />
                  ))}
                </Box>
              </Card>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Receipt
              </Typography>
            </Box>

            {/* Notes Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h3" sx={{ fontWeight: 600, mb: 2 }}>
                Notes
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Add comments or notes about this expense."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                sx={{ mb: 3 }}
              />
            </Box>

            {/* Mark as Settled Section */}
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                Mark as Settled
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Settle this transaction
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 300, mx: 'auto' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleViewDetails}
                  sx={{
                    bgcolor: 'success.main',
                    color: 'background.default',
                    '&:hover': { bgcolor: 'success.dark' }
                  }}
                >
                  View Details
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSettle}
                  sx={{
                    bgcolor: 'success.main',
                    color: 'background.default',
                    '&:hover': { bgcolor: 'success.dark' }
                  }}
                >
                  Settle
                </Button>
              </Box>
            </Box>
          </Grid>

          {/* Right Column - Member Payment Status */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {splitData.members.map((member) => (
                <Card key={member.id}>
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {member.name}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                      ${member.amount}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleMarkPaid(member.id)}
                        sx={{
                          bgcolor: 'success.main',
                          color: 'background.default',
                          '&:hover': { bgcolor: 'success.dark' }
                        }}
                      >
                        Paid
                      </Button>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => handleEdit(member.id)}
                        sx={{
                          bgcolor: 'success.main',
                          color: 'background.default',
                          '&:hover': { bgcolor: 'success.dark' }
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="text"
                        fullWidth
                        onClick={() => handleDelete(member.id)}
                        sx={{ color: 'text.secondary' }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default SplitDetails 