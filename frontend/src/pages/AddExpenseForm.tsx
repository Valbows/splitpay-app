import React, { useState } from 'react'
import * as Yup from 'yup'
import {
  Box,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  Paper,
  useTheme,
  CircularProgress,
  Avatar,
} from '@mui/material'
import {
  Menu as MenuIcon,
  AttachMoney,
  Save,
  ArrowBack,
  Add,
  UploadFile,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { useCreateExpense, useUserGroups } from '../hooks/useApi'
import api from '../services/api'

const expenseSchema = Yup.object().shape({
  description: Yup.string().required('Description is required'),
  amount: Yup.number().positive('Amount must be positive').required('Amount is required'),
  group_id: Yup.number().required('Group is required'),
  notes: Yup.string(),
  receipt: Yup.mixed().optional(),
})

const AddExpenseForm = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [selectedFileName, setSelectedFileName] = useState('')

  const { createExpense, loading: isCreating } = useCreateExpense()
  const { data: userGroups, loading: groupsLoading } = useUserGroups()

  const formik = useFormik({
    initialValues: {
      description: '',
      amount: '',
      group_id: '',
      receipt: null as File | null,
      notes: '',
    },
    validationSchema: expenseSchema,
    onSubmit: async (values) => {
      setError('')
      try {
        const expensePayload = {
          description: values.description,
          amount: parseFloat(values.amount),
          group_id: parseInt(values.group_id, 10),
          paid_by_user_id: 1, // TODO: Replace with actual logged-in user ID
          notes: values.notes,
        }

        const newExpense = await createExpense(expensePayload)

        if (values.receipt && newExpense) {
          await api.expenses.uploadReceipt(newExpense.id, values.receipt)
        }
        
        navigate('/expenses')
      } catch (err) {
        setError('Failed to create expense. Please try again.')
        console.error(err)
      }
    },
  })

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <AppBar 
        position="static" 
        sx={{ 
          bgcolor: 'background.paper',
          boxShadow: 'none',
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            sx={{ mr: 2, color: 'text.primary' }}
            onClick={() => navigate(-1)}
          >
            <ArrowBack />
          </IconButton>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #00ff88, #00cc66)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&::before': {
                  content: '"⚡"',
                  fontSize: '12px',
                }
              }}
            />
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                color: 'text.primary', 
                fontWeight: 'bold',
                letterSpacing: '0.5px'
              }}
            >
              SplitPay
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box sx={{ px: 3, py: 4, maxWidth: 600, mx: 'auto' }}>
        {/* Page Title */}
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            mb: 4,
            textAlign: 'center'
          }}
        >
          Add New Expense
        </Typography>

        <Card>
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Expense Description */}
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Expense Description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />

                {/* Amount */}
                <TextField
                  fullWidth
                  id="amount"
                  name="amount"
                  label="Amount"
                  type="number"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />

                {/* Group */}
                <TextField
                  fullWidth
                  select
                  id="group_id"
                  name="group_id"
                  label="Group"
                  value={formik.values.group_id}
                  onChange={formik.handleChange}
                  error={formik.touched.group_id && Boolean(formik.errors.group_id)}
                  helperText={formik.touched.group_id && formik.errors.group_id}
                  disabled={groupsLoading}
                >
                  {groupsLoading ? (
                    <MenuItem value="">
                      <CircularProgress size={20} />
                    </MenuItem>
                  ) : (
                    userGroups?.map((group) => (
                      <MenuItem key={group.id} value={group.id}>
                        {group.name}
                      </MenuItem>
                    ))
                  )}
                </TextField>

                {/* Receipt Upload */}
                <Box>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    startIcon={<UploadFile />}
                  >
                    Upload Receipt
                    <input
                      type="file"
                      hidden
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0] || null
                        formik.setFieldValue("receipt", file)
                        setSelectedFileName(file ? file.name : '')
                      }}
                    />
                  </Button>
                  {selectedFileName && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Selected: {selectedFileName}
                    </Typography>
                  )}
                </Box>

                {/* Notes */}
                <TextField
                  fullWidth
                  id="notes"
                  name="notes"
                  label="Notes"
                  multiline
                  rows={3}
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                />

                {error && (
                  <Typography color="error" sx={{ mt: 2 }}>
                    {error}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<Save />}
                  disabled={isCreating}
                  sx={{ mt: 2 }}
                >
                  {isCreating ? <CircularProgress size={24} /> : 'Save Expense'}
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default AddExpenseForm 