import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton,
  CircularProgress
} from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import axios from 'axios'

interface DashboardData {
  totalBalance: number
  activeGroups: number
  pendingActions: number
  settledPayments: number
}

const OverviewCards = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dashboard`)
        setData(response.data)
      } catch (err) {
        setError('Failed to fetch dashboard data')
        console.error('Dashboard fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        {error}
      </Typography>
    )
  }

  const cardsData = [
    {
      title: 'Total Balance',
      value: data ? `$${data.totalBalance.toFixed(2)}` : '$0.00',
      change: '+5%',
      changeType: 'positive' as const
    },
    {
      title: 'Active Groups',
      value: data?.activeGroups.toString() || '0',
      change: '0%',
      changeType: 'neutral' as const
    },
    {
      title: 'Pending Actions',
      value: data?.pendingActions.toString() || '0',
      change: '-1%',
      changeType: 'negative' as const
    },
    {
      title: 'Settled Payments',
      value: data ? `$${data.settledPayments.toFixed(2)}` : '$0.00',
      change: '+2%',
      changeType: 'positive' as const
    }
  ]

  const getChangeColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'success.main'
      case 'negative':
        return 'error.main'
      default:
        return 'text.secondary'
    }
  }

  return (
    <Grid container spacing={3}>
      {cardsData.map((card, index) => (
        <Grid item xs={12} sm={6} lg={3} key={index}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  {card.title}
                </Typography>
                <IconButton size="small" color="inherit">
                  <MoreHoriz fontSize="small" />
                </IconButton>
              </Box>
              <Box>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {card.value}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: getChangeColor(card.changeType),
                    fontWeight: 500 
                  }}
                >
                  {card.change}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default OverviewCards 