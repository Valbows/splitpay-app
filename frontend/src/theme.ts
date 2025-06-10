import { createTheme } from '@mui/material/styles'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff88',
      dark: '#00cc66',
      light: '#33ff99',
    },
    secondary: {
      main: '#ff4444',
      dark: '#cc3333',
      light: '#ff6666',
    },
    background: {
      default: '#1a1a1a',
      paper: '#2a2a2a',
    },
    surface: {
      main: '#3a3a3a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#9CA3AF',
    },
    success: {
      main: '#00ff88',
    },
    error: {
      main: '#ff4444',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.125rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2a2a',
          border: '1px solid #3a3a3a',
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2a2a',
          border: '1px solid #3a3a3a',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#2a2a2a',
          borderRight: '1px solid #3a3a3a',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#2a2a2a',
          borderBottom: '1px solid #3a3a3a',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 0',
          '&:hover': {
            backgroundColor: '#3a3a3a',
          },
          '&.Mui-selected': {
            backgroundColor: '#3a3a3a',
            '&:hover': {
              backgroundColor: '#4a4a4a',
            },
          },
        },
      },
    },
  },
})

// Extend the theme's palette interface
declare module '@mui/material/styles' {
  interface Palette {
    surface: Palette['primary']
  }

  interface PaletteOptions {
    surface?: PaletteOptions['primary']
  }
} 