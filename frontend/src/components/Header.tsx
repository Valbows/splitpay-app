import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Box, 
  IconButton, 
  Avatar,
  Button 
} from '@mui/material'
import { 
  Search, 
  Apps, 
  AccountCircle,
  Add 
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const navigate = useNavigate()

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Logo and Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main', 
              width: 32, 
              height: 32, 
              mr: 2,
              color: 'background.default'
            }}
          >
            S
          </Avatar>
          <Typography variant="h6" component="h1" sx={{ fontWeight: 600 }}>
            SplitPay
          </Typography>
        </Box>

        {/* Right Navigation */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Add />}
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
            variant="outlined"
            onClick={() => navigate('/signin')}
            sx={{
              borderColor: '#FFD700',
              color: '#FFD700',
              '&:hover': {
                borderColor: '#FFC700',
                backgroundColor: 'rgba(255, 215, 0, 0.1)',
              },
            }}
          >
            Sign In
          </Button>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <IconButton color="inherit">
            <Apps />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header 