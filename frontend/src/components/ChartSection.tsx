import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton 
} from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'

const ChartSection = () => {
  // Sample data for Total Spending line chart
  const spendingData = [
    { month: 'Jan', amount: 300 },
    { month: 'Feb', amount: 600 },
    { month: 'Mar', amount: 500 },
    { month: 'Apr', amount: 700 },
    { month: 'May', amount: 800 },
    { month: 'Jun', amount: 900 },
    { month: 'Jul', amount: 750 },
    { month: 'Aug', amount: 850 },
    { month: 'Sep', amount: 950 },
    { month: 'Oct', amount: 1000 },
    { month: 'Nov', amount: 1100 },
    { month: 'Dec', amount: 1200 }
  ]

  // Sample data for Pending Payments bar chart
  const paymentsData = [
    { month: 'Jan', amount: 180 },
    { month: 'Feb', amount: 220 },
    { month: 'Mar', amount: 280 },
    { month: 'Apr', amount: 290 },
    { month: 'May', amount: 260 },
    { month: 'Jun', amount: 300 }
  ]

  return (
    <Grid container spacing={3}>
      {/* Total Spending Chart */}
      <Grid item xs={12} lg={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                  Total Spending
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
                    $1,200
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
                    +5%
                  </Typography>
                </Box>
              </Box>
              <IconButton size="small" color="inherit">
                <MoreHoriz fontSize="small" />
              </IconButton>
            </Box>
            <Box sx={{ height: 250, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    tickFormatter={(value: number) => `$${value}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#00ff88" 
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#00ff88' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* Pending Payments Chart */}
      <Grid item xs={12} lg={6}>
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 1 }}>
                  Pending Payments
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h4" component="span" sx={{ fontWeight: 'bold' }}>
                    $300
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 500 }}>
                    +3%
                  </Typography>
                </Box>
              </Box>
              <IconButton size="small" color="inherit">
                <MoreHoriz fontSize="small" />
              </IconButton>
            </Box>
            <Box sx={{ height: 250, mt: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={paymentsData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                    tickFormatter={(value: number) => `$${value}`}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#00ff88" 
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ChartSection 