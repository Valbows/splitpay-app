import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
  Divider,
  Link,
  InputAdornment,
  useTheme,
} from '@mui/material'
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Visibility,
  VisibilityOff,
  ArrowBack,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const SignIn: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual sign-in logic
    console.log('Sign in with:', { email, password })
    // For now, navigate to dashboard
    navigate('/dashboard')
  }

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`Sign in with ${provider}`)
    navigate('/dashboard')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'relative',
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={() => navigate('/')}
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          color: theme.palette.text.secondary,
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          },
        }}
      >
        <ArrowBack />
      </IconButton>

      {/* Main Container */}
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: 4,
          backgroundColor: 'transparent',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            backgroundColor: '#00ff88',
            color: '#000',
            padding: '16px 32px',
            borderRadius: 2,
            marginBottom: 4,
            fontWeight: 'bold',
            fontSize: '24px',
            letterSpacing: '2px',
            fontFamily: 'Roboto, sans-serif',
          }}
        >
          SPLITPAY
        </Box>

        {/* Title */}
        <Typography
          variant="h4"
          component="h1"
          sx={{
            color: theme.palette.text.primary,
            marginBottom: 4,
            fontWeight: 600,
            textAlign: 'center',
          }}
        >
          Sign in your account
        </Typography>

        {/* Sign In Form */}
        <Box
          component="form"
          onSubmit={handleSignIn}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* Email Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                marginBottom: 1,
                fontWeight: 500,
              }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ff88',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  color: theme.palette.text.primary,
                  '&::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                },
              }}
            />
          </Box>

          {/* Password Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                marginBottom: 1,
                fontWeight: 500,
              }}
            >
              Password
            </Typography>
            <TextField
              fullWidth
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ff88',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  color: theme.palette.text.primary,
                  '&::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 1,
                  },
                },
              }}
            />
          </Box>

          {/* Sign In Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#00ff88',
              color: '#000',
              fontWeight: 'bold',
              fontSize: '16px',
              letterSpacing: '1px',
              borderRadius: 2,
              padding: '14px',
              marginTop: 2,
              '&:hover': {
                backgroundColor: '#00cc66',
              },
              textTransform: 'uppercase',
            }}
          >
            Sign In
          </Button>
        </Box>

        {/* Social Login */}
        <Box sx={{ width: '100%', marginTop: 4 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2,
              marginBottom: 3,
            }}
          >
            <IconButton
              onClick={() => handleSocialLogin('Google')}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: theme.palette.text.primary,
                padding: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <GoogleIcon />
            </IconButton>
            <IconButton
              onClick={() => handleSocialLogin('Facebook')}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: theme.palette.text.primary,
                padding: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              onClick={() => handleSocialLogin('Twitter')}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: theme.palette.text.primary,
                padding: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            >
              <TwitterIcon />
            </IconButton>
          </Box>

          {/* Sign Up Link */}
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: theme.palette.text.secondary,
            }}
          >
            Don't have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={() => navigate('/signup')}
              sx={{
                color: '#00ff88',
                fontWeight: 'bold',
                textDecoration: 'none',
                textTransform: 'uppercase',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Sign Up
            </Link>
          </Typography>
        </Box>

        {/* Page Indicators */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            marginTop: 3,
          }}
        >
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: theme.palette.text.primary,
            }}
          />
        </Box>
      </Paper>
    </Box>
  )
}

export default SignIn 