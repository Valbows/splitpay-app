import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton 
} from '@mui/material'
import { MoreHoriz } from '@mui/icons-material'

interface CardData {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
}

const OverviewCards = () => {
  const cardsData: CardData[] = [
    {
      title: 'Total Balance',
      value: '$1,200',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Active Groups',
      value: '4',
      change: '0%',
      changeType: 'neutral'
    },
    {
      title: 'Pending Actions',
      value: '3',
      change: '-1%',
      changeType: 'negative'
    },
    {
      title: 'Settled Payments',
      value: '$800',
      change: '+2%',
      changeType: 'positive'
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