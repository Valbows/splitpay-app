import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
  IconButton,
  Tabs,
  Tab,
  Pagination,
  Divider,
} from '@mui/material'
import {
  Add,
  Visibility,
  Star,
  StarBorder,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Groups = () => {
  const navigate = useNavigate()
  
  // Sample data for user groups
  const userGroups = [
    { id: 1, name: 'Book Club', subtitle: 'Friends', avatar: '📚' },
    { id: 2, name: 'Tech Talks', subtitle: 'Work', avatar: '💻' },
    { id: 3, name: 'Small Business Talks', subtitle: 'Freelance', avatar: '💼' },
    { id: 4, name: 'Fitness Friends', subtitle: 'Friends', avatar: '🏋️' },
    { id: 5, name: 'Museum', subtitle: 'Friends', avatar: '🏛️' },
    { id: 6, name: 'Tech consulting', subtitle: 'Freelance', avatar: '⚡' },
  ]

  // Sample data for detailed group activities
  const groupActivities = [
    {
      id: 1,
      name: 'Hiking Enthusiasts',
      description: 'Join us for outdoor adventures!',
      status: 'Active',
      balance: { type: 'owe', amount: 10 },
      starred: true,
    },
    {
      id: 2,
      name: 'Book Club',
      description: 'Discussing the latest reads.',
      status: 'Active',
      balance: { type: 'owed', amount: 15 },
      starred: true,
    },
    {
      id: 3,
      name: 'Tech Talks',
      description: 'Exploring new technologies.',
      status: 'Active',
      balance: { type: 'owe', amount: 5 },
      starred: true,
    },
    {
      id: 4,
      name: 'Foodies United',
      description: 'Culinary adventures await.',
      status: 'Active',
      balance: { type: 'owed', amount: 20 },
      starred: true,
    },
    {
      id: 5,
      name: 'Fitness Friends',
      description: 'Stay fit with friends.',
      status: 'Active',
      balance: { type: 'owe', amount: 8 },
      starred: true,
    },
    {
      id: 6,
      name: 'Art Lovers',
      description: 'Appreciating art together.',
      status: 'Active',
      balance: { type: 'owed', amount: 12 },
      starred: true,
    },
  ]

  return (
    <Box>
      {/* Hero Banner - Create A New Group */}
      <Card
        sx={{
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
          height: 200,
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          },
        }}
      >
        <CardContent
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              mb: 3,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Create A New Group
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            onClick={() => navigate('/create-group')}
            sx={{
              bgcolor: 'success.main',
              color: 'background.default',
              fontWeight: 'bold',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: 'success.dark',
              },
            }}
          >
            New Group
          </Button>
        </CardContent>
      </Card>

      {/* Your Groups Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          Your Groups
        </Typography>
        <Grid container spacing={3}>
          {userGroups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group.id}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                      {group.avatar}
                    </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        {group.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {group.subtitle}
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => navigate(`/group/${group.id}`)}
                      sx={{
                        bgcolor: 'success.main',
                        color: 'background.default',
                        '&:hover': {
                          bgcolor: 'success.dark',
                        },
                      }}
                    >
                      View
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Group Activity Section */}
      <Card>
        <CardContent>
          {/* Filter Tabs */}
          <Box sx={{ mb: 3 }}>
            <Tabs
              value={0}
              sx={{
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                },
              }}
            >
              <Tab label="Active/Archived" />
              <Tab label="Balance Status" />
              <Tab label="Recent Activity" />
            </Tabs>
          </Box>

          {/* Group Activities List */}
          <Box>
            {groupActivities.map((group, index) => (
              <Box key={group.id}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    py: 3,
                    gap: 3,
                  }}
                >
                  {/* Group Info */}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {group.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {group.description}
                    </Typography>
                    <Chip
                      label={group.status}
                      size="small"
                      sx={{
                        bgcolor: 'success.main',
                        color: 'background.default',
                        fontWeight: 500,
                      }}
                    />
                  </Box>

                  {/* Balance Info */}
                  <Box sx={{ textAlign: 'right', minWidth: 120 }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        color: group.balance.type === 'owe' ? 'error.main' : 'success.main',
                        mb: 2,
                      }}
                    >
                      {group.balance.type === 'owe' ? 'You owe' : 'You are owed'} $
                      {group.balance.amount}
                    </Typography>

                    {/* Action Buttons */}
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => navigate('/new-expenses')}
                        sx={{
                          bgcolor: 'success.main',
                          color: 'background.default',
                          '&:hover': {
                            bgcolor: 'success.dark',
                          },
                        }}
                      >
                        Add Expense
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          bgcolor: 'success.main',
                          color: 'background.default',
                          '&:hover': {
                            bgcolor: 'success.dark',
                          },
                        }}
                      >
                        Settle Up
                      </Button>
                      <Button variant="outlined" size="small">
                        Details
                      </Button>
                    </Box>
                  </Box>

                  {/* Star Icon */}
                  <IconButton size="small" color="primary">
                    {group.starred ? <Star /> : <StarBorder />}
                  </IconButton>
                </Box>
                {index < groupActivities.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination
              count={3}
              page={1}
              color="primary"
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'text.primary',
                },
              }}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Groups 