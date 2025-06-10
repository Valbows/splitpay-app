import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Toolbar 
} from '@mui/material'
import { 
  Dashboard, 
  Groups, 
  Settings,
  Add,
  Receipt 
} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'

export const drawerWidth = 240

const Sidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: Dashboard, 
      path: '/dashboard'
    },
    { 
      name: 'Groups', 
      icon: Groups, 
      path: '/groups'
    },
    { 
      name: 'Add Expenses', 
      icon: Add, 
      path: '/new-expenses'
    },
    { 
      name: 'View Expenses', 
      icon: Receipt, 
      path: '/expenses'
    },
    { 
      name: 'Settings', 
      icon: Settings, 
      path: '/settings'
    }
  ]

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path || 
                          (location.pathname === '/' && item.path === '/dashboard')
          
          return (
            <ListItem key={item.name} disablePadding>
              <ListItemButton 
                selected={isActive}
                onClick={() => handleNavigation(item.path)}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}

export default Sidebar 