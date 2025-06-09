const TOKEN_KEY = "splitpay_token"
const USER_KEY = "splitpay_user"

// Token management
export const getStoredToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY)
}

export const setStoredToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token)
}

export const removeStoredToken = (): void => {
  localStorage.removeItem(TOKEN_KEY)
}

// User data management
export const getStoredUser = <T>(): T | null => {
  const userData = localStorage.getItem(USER_KEY)
  if (!userData) return null
  try {
    return JSON.parse(userData) as T
  } catch {
    return null
  }
}

export const setStoredUser = <T>(user: T): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const removeStoredUser = (): void => {
  localStorage.removeItem(USER_KEY)
}

// Clear all storage
export const clearStorage = (): void => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}
