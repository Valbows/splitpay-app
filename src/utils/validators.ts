export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter")
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`
  }
  return null
}

export const validateAmount = (amount: string): string | null => {
  const parsed = Number.parseFloat(amount)
  if (isNaN(parsed) || parsed <= 0) {
    return "Amount must be a positive number"
  }
  return null
}

export const validateInviteCode = (code: string): string | null => {
  if (!code || code.trim().length === 0) {
    return "Invite code is required"
  }

  if (code.length < 3) {
    return "Invite code must be at least 3 characters"
  }

  return null
}
