import { Box, Fab, SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material'
import { Add, CameraAlt, Edit } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import OverviewCards from '../components/OverviewCards'
import ChartSection from '../components/ChartSection'
import RecentActivity from '../components/RecentActivity'

const Dashboard = () => {
  const navigate = useNavigate()

  const speedDialActions = [
    {
      icon: <CameraAlt />,
      name: 'Scan Receipt',
      onClick: () => navigate('/new-expenses')
    },
    {
      icon: <Edit />,
      name: 'Add Manually',
      onClick: () => navigate('/new-expenses')
    },
    {
      icon: <Add />,
      name: 'View Expenses',
      onClick: () => navigate('/expenses')
    }
  ]

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, position: 'relative' }}>
      <OverviewCards />
      <ChartSection />
      <RecentActivity />
      
      {/* Floating Action Button for Quick Expense Entry */}
      <SpeedDial
        ariaLabel="Add Expense"
        sx={{ 
          position: 'fixed', 
          bottom: 32, 
          right: 32,
          '& .MuiFab-primary': {
            bgcolor: 'success.main',
            '&:hover': {
              bgcolor: 'success.dark',
            }
          }
        }}
        icon={<SpeedDialIcon />}
      >
        {speedDialActions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
            sx={{
              '& .MuiFab-primary': {
                bgcolor: 'success.main',
                color: 'white',
                '&:hover': {
                  bgcolor: 'success.dark',
                }
              }
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  )
}

export default Dashboard 