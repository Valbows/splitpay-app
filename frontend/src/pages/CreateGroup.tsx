import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Avatar,
  AvatarGroup,
  IconButton,
  InputAdornment,
  Divider,
} from '@mui/material'
import {
  ContentCopy,
  FlightTakeoff,
  Home,
  Groups,
  Add,
  KeyboardArrowDown,
  MoreHoriz,
  LocationOn,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const CreateGroup = () => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
    category: '',
    invitedEmails: [] as string[],
    inviteLink: 'https://splitpay.app/invite/abc123xyz',
  })
  const [emailInput, setEmailInput] = useState('')

  const categories = [
    { id: 'trip', label: 'Trip', icon: FlightTakeoff },
    { id: 'household', label: 'Household', icon: Home },
    { id: 'friends', label: 'Friends', icon: Groups },
    { id: 'new', label: 'New category', icon: Add },
  ]

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleSkip = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleAddEmail = () => {
    if (emailInput && !groupData.invitedEmails.includes(emailInput)) {
      setGroupData({
        ...groupData,
        invitedEmails: [...groupData.invitedEmails, emailInput],
      })
      setEmailInput('')
    }
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(groupData.inviteLink)
    // You could add a toast notification here
  }

  const handleReturnToGroups = () => {
    navigate('/groups')
  }

  const renderStep1 = () => (
    <Box sx={{ textAlign: 'center', maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h3" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
        Create New Group
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Start splitting expenses with friends.
      </Typography>
      
      <TextField
        fullWidth
        label="Group Name"
        value={groupData.name}
        onChange={(e) => setGroupData({ ...groupData, name: e.target.value })}
        sx={{ mb: 4 }}
        InputLabelProps={{
          sx: { color: 'text.secondary' }
        }}
      />
      
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleNext}
        disabled={!groupData.name.trim()}
        sx={{
          mb: 3,
          bgcolor: 'grey.300',
          color: 'text.primary',
          '&:hover': { bgcolor: 'grey.400' },
          '&:disabled': { bgcolor: 'grey.600', color: 'grey.500' }
        }}
      >
        Create Group
      </Button>
      
      <Divider sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          or continue with
        </Typography>
      </Divider>
    </Box>
  )

  const renderStep2 = () => (
    <Box sx={{ textAlign: 'center', maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h3" component="h1" sx={{ mb: 1, fontWeight: 'bold' }}>
        Add a Description
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        (Optional)
      </Typography>
      
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3}
        value={groupData.description}
        onChange={(e) => setGroupData({ ...groupData, description: e.target.value })}
        sx={{ mb: 4 }}
        InputLabelProps={{
          sx: { color: 'text.secondary' }
        }}
      />
      
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleNext}
        sx={{
          mb: 3,
          bgcolor: 'grey.300',
          color: 'text.primary',
          '&:hover': { bgcolor: 'grey.400' }
        }}
      >
        Next
      </Button>
      
      <Button
        variant="text"
        onClick={handleSkip}
        sx={{ color: 'success.main' }}
      >
        Skip
      </Button>
    </Box>
  )

  const renderStep3 = () => (
    <Box sx={{ textAlign: 'center', maxWidth: 600, mx: 'auto' }}>
      {/* Category Selection */}
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
        Select Category
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 6, justifyContent: 'center', flexWrap: 'wrap' }}>
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Chip
              key={category.id}
              icon={<Icon />}
              label={`Category ${category.label}`}
              onClick={() => setGroupData({ ...groupData, category: category.id })}
              variant={groupData.category === category.id ? 'filled' : 'outlined'}
              sx={{
                px: 2,
                py: 1,
                fontSize: '0.9rem',
                '& .MuiChip-icon': { fontSize: '1.2rem' }
              }}
            />
          )
        })}
        <Button
          variant="contained"
          size="small"
          sx={{
            bgcolor: 'grey.300',
            color: 'text.primary',
            '&:hover': { bgcolor: 'grey.400' }
          }}
        >
          Select
        </Button>
      </Box>

      {/* Invite Members */}
      <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
        Invite Members
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Enter an email address to invite members.
      </Typography>
      
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        sx={{ mb: 3, maxWidth: 400 }}
        InputLabelProps={{
          sx: { color: 'text.secondary' }
        }}
      />
      
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleAddEmail}
        disabled={!emailInput.trim()}
        sx={{
          mb: 3,
          maxWidth: 400,
          bgcolor: 'grey.300',
          color: 'text.primary',
          '&:hover': { bgcolor: 'grey.400' },
          '&:disabled': { bgcolor: 'grey.600', color: 'grey.500' }
        }}
      >
        Add
      </Button>
      
      <Button
        variant="text"
        onClick={handleNext}
        sx={{ color: 'success.main' }}
      >
        Skip
      </Button>
    </Box>
  )

  const renderStep4 = () => (
    <Box sx={{ textAlign: 'center', maxWidth: 500, mx: 'auto' }}>
      {/* Invite Link Section */}
      <Typography variant="h4" component="h1" sx={{ mb: 2, fontWeight: 'bold' }}>
        Invite Link
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Share this link to invite members.
      </Typography>
      
      <TextField
        fullWidth
        label="Invite Link"
        value={groupData.inviteLink}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleCopyLink}>
                <ContentCopy />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
        InputLabelProps={{
          sx: { color: 'text.secondary' }
        }}
      />
      
      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={handleCopyLink}
        sx={{
          mb: 3,
          bgcolor: 'success.main',
          color: 'background.default',
          '&:hover': { bgcolor: 'success.dark' }
        }}
      >
        Copy Link
      </Button>
      
      <Button
        variant="text"
        onClick={handleReturnToGroups}
        sx={{ color: 'success.main', mb: 6 }}
      >
        Skip
      </Button>

      {/* Current Members Section */}
      <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, p: 3, bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: 1200, mx: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              Current Members
              <KeyboardArrowDown />
            </Typography>
            <Chip
              label="Active"
              size="small"
              sx={{
                bgcolor: 'success.main',
                color: 'background.default',
                '&::before': {
                  content: '"●"',
                  marginRight: 1,
                }
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                <Avatar>U</Avatar>
                <Avatar>J</Avatar>
                <Avatar>M</Avatar>
                <Avatar>S</Avatar>
              </AvatarGroup>
              <Typography variant="body2" color="text.secondary">
                You (Admin) +12 others
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleReturnToGroups}
                sx={{
                  bgcolor: 'success.main',
                  color: 'background.default',
                  '&:hover': { bgcolor: 'success.dark' }
                }}
              >
                Return To Groups
              </Button>
              <IconButton>
                <MoreHoriz />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        position: 'relative',
      }}
    >
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
      {currentStep === 4 && renderStep4()}
    </Box>
  )
}

export default CreateGroup 