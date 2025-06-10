import { useState } from 'react'
import {
  Box,
  Typography,
  Button,
  Avatar,
  AvatarGroup,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  FormControl,
  AppBar,
  Toolbar,
  InputBase,
  Badge,
} from '@mui/material'
import {
  Home,
  Search,
  Apps,
  Share,
  MoreHoriz,
  KeyboardArrowDown,
  Person,
} from '@mui/icons-material'
import { useParams, useNavigate } from 'react-router-dom'

const GroupDetail = () => {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const [currentTab, setCurrentTab] = useState(0)
  const [expenseFilter, setExpenseFilter] = useState('Expense')

  // Sample group data
  const groupData = {
    id: groupId,
    name: 'Company Retreat',
    members: [
      { id: 1, name: 'You', handle: '@You', avatar: 'Y', isCurrentUser: true },
      { id: 2, name: 'Elara Nyx', handle: '@elara_nyx', avatar: 'E', isCurrentUser: false },
      { id: 3, name: 'Orion Voss', handle: '@orion_voss', avatar: 'O', isCurrentUser: false },
      { id: 4, name: 'Company', handle: '@g_corporat', avatar: 'C', isCurrentUser: false },
    ],
    memberCount: 15, // Total including the +12 others
  }

  const expenseCategories = ['Hotel', 'Food', 'Events', 'Travel', 'Other']

  const tabs = ['Expenses', 'Balances & Settlements', 'New Expenses', 'Analytics']

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue)
  }

  const handleRemoveMember = (memberId: number) => {
    // Handle member removal logic here
    console.log('Remove member:', memberId)
  }

  const renderTopHeader = () => (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: 'background.paper',
        boxShadow: 'none',
        borderBottom: 1,
        borderColor: 'divider'
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Home sx={{ color: 'text.primary' }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ color: 'text.primary', fontWeight: 'bold' }}
          >
            ExpenseHub
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton sx={{ color: 'text.primary' }}>
            <Search />
          </IconButton>
          <IconButton sx={{ color: 'text.primary' }}>
            <Apps />
          </IconButton>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
            U
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  )

  const renderGroupHeader = () => (
    <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
              {groupData.name}
            </Typography>
            <KeyboardArrowDown sx={{ color: 'text.secondary' }} />
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
              {groupData.members.map((member) => (
                <Avatar key={member.id} sx={{ bgcolor: 'primary.main' }}>
                  {member.avatar}
                </Avatar>
              ))}
            </AvatarGroup>
            <Typography variant="body1" color="text.secondary">
              Elara, Orion, Zephyr +12 others
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={<Share />}
            sx={{
              bgcolor: 'success.main',
              color: 'background.default',
              '&:hover': { bgcolor: 'success.dark' }
            }}
          >
            Share
          </Button>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )

  const renderSubNavigation = () => (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs 
        value={currentTab} 
        onChange={handleTabChange}
        sx={{
          '& .MuiTab-root': { textTransform: 'none', fontSize: '1rem' },
          '& .Mui-selected': { color: 'success.main' },
          '& .MuiTabs-indicator': { bgcolor: 'success.main' }
        }}
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab} />
        ))}
      </Tabs>
    </Box>
  )

  const renderExpenseCategories = () => (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 3 }}>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={expenseFilter}
            onChange={(e) => setExpenseFilter(e.target.value)}
            displayEmpty
            sx={{ '& .MuiSelect-select': { display: 'flex', alignItems: 'center', gap: 1 } }}
          >
            <MenuItem value="Expense">
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                Expense
                <KeyboardArrowDown />
              </Box>
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      
      <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
        {expenseCategories.map((category, index) => (
          <ListItem 
            key={index} 
            button
            sx={{ 
              py: 1.5,
              '&:hover': { bgcolor: 'action.hover' }
            }}
          >
            <ListItemText 
              primary={category}
              sx={{ '& .MuiListItemText-primary': { fontSize: '1rem' } }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const renderGroupMembers = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
        Group Members
      </Typography>
      
      <List sx={{ bgcolor: 'background.paper', borderRadius: 1 }}>
        {groupData.members.map((member) => (
          <ListItem 
            key={member.id}
            sx={{ 
              py: 2,
              borderBottom: member.id !== groupData.members.length ? 1 : 0,
              borderColor: 'divider'
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}>
                {member.avatar}
              </Avatar>
            </ListItemAvatar>
            
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {member.name}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="text.secondary">
                  {member.handle}
                </Typography>
              }
            />
            
            <ListItemSecondaryAction>
              {!member.isCurrentUser && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleRemoveMember(member.id)}
                  sx={{
                    bgcolor: 'error.main',
                    color: 'white',
                    '&:hover': { bgcolor: 'error.dark' }
                  }}
                >
                  Remove
                </Button>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const renderTabContent = () => {
    switch (currentTab) {
      case 0: // Expenses
        return (
          <>
            {renderExpenseCategories()}
            {renderGroupMembers()}
          </>
        )
      case 1: // Balances & Settlements
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Balances & Settlements content coming soon...
            </Typography>
          </Box>
        )
      case 2: // New Expenses
        return (
          <Box sx={{ p: 3 }}>
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

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Button
                  variant="contained"
                  size="large"
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
        )
      case 3: // Analytics
        return (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              Analytics dashboard coming soon...
            </Typography>
          </Box>
        )
      default:
        return null
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {renderTopHeader()}
      {renderGroupHeader()}
      {renderSubNavigation()}
      {renderTabContent()}
    </Box>
  )
}

export default GroupDetail 