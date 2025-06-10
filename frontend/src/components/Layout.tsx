import { ReactNode } from 'react'
import { Box } from '@mui/material'
import Header from './Header'
import Sidebar, { drawerWidth } from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          mt: 8, // AppBar height
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default Layout 