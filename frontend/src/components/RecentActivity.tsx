import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Divider 
} from '@mui/material'
import { KeyboardArrowDown, FiberManualRecord } from '@mui/icons-material'

interface ActivityItem {
  id: number
  description: string
  type: 'paid' | 'received' | 'owe' | 'settled' | 'added'
}

const RecentActivity = () => {
  const activities: ActivityItem[] = [
    {
      id: 1,
      description: 'Paid $50 to Group A',
      type: 'paid'
    },
    {
      id: 2,
      description: 'Received $100 from Group B',
      type: 'received'
    },
    {
      id: 3,
      description: 'Owe $30 to Group C',
      type: 'owe'
    },
    {
      id: 4,
      description: 'Settled $70 with Group D',
      type: 'settled'
    },
    {
      id: 5,
      description: 'Added expense $40 to Group E',
      type: 'added'
    }
  ]

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
            Recent Activity
          </Typography>
          <IconButton size="small" color="inherit">
            <KeyboardArrowDown fontSize="small" />
          </IconButton>
        </Box>
        
        <List sx={{ py: 0 }}>
          {activities.map((activity, index) => (
            <Box key={activity.id}>
              <ListItem sx={{ px: 0, py: 1.5 }}>
                <ListItemIcon sx={{ minWidth: '32px' }}>
                  <FiberManualRecord 
                    sx={{ 
                      fontSize: 8, 
                      color: 'success.main' 
                    }} 
                  />
                </ListItemIcon>
                <ListItemText 
                  primary={activity.description}
                  primaryTypographyProps={{
                    variant: 'body2',
                    color: 'text.secondary'
                  }}
                />
              </ListItem>
              {index < activities.length - 1 && (
                <Divider sx={{ borderColor: 'divider' }} />
              )}
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default RecentActivity 