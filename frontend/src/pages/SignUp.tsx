import React, { useState } from 'react'
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  IconButton,
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

const SignUp: React.FC = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement actual sign-up logic
    console.log('Sign up with:', formData)
    // For now, navigate to dashboard
    navigate('/dashboard')
  }

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`Sign up with ${provider}`)
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
        onClick={() => navigate('/signin')}
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
          Create your account
        </Typography>

        {/* Sign Up Form */}
        <Box
          component="form"
          onSubmit={handleSignUp}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
          }}
        >
          {/* Name Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                marginBottom: 1,
                fontWeight: 500,
              }}
            >
              Full Name
            </Typography>
            <TextField
              fullWidth
              type="text"
              value={formData.name}
              onChange={handleInputChange('name')}
              placeholder="Enter your full name"
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
              value={formData.email}
              onChange={handleInputChange('email')}
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
              value={formData.password}
              onChange={handleInputChange('password')}
              placeholder="Enter your password"
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

          {/* Confirm Password Field */}
          <Box>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.primary,
                marginBottom: 1,
                fontWeight: 500,
              }}
            >
              Confirm Password
            </Typography>
            <TextField
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              placeholder="Confirm your password"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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

          {/* Sign Up Button */}
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
                backgroundColor: '#FFC700',
              },
              textTransform: 'uppercase',
            }}
          >
            Sign Up
          </Button>
        </Box>

        {/* Social Login */}
        <Box sx={{ width: '100%', marginTop: 3 }}>
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

          {/* Sign In Link */}
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              color: theme.palette.text.secondary,
            }}
          >
            Already have an account?{' '}
            <Link
              component="button"
              type="button"
              onClick={() => navigate('/signin')}
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
              Sign In
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
              backgroundColor: theme.palette.text.primary,
            }}
          />
          <Box
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            }}
          />
        </Box>
      </Paper>
    </Box>
  )
}

export default SignUp 