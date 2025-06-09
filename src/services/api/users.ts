import { apiClient } from "@/services/utils/api-client"
import type { User } from "@/types/auth.types"
import { API_ENDPOINTS } from "@/constants/api-endpoints"

export const getUsers = async (): Promise<User[]> => {
  return apiClient.get<User[]>(API_ENDPOINTS.USERS)
}

export const getUser = async (id: string): Promise<User> => {
  return apiClient.get<User>(API_ENDPOINTS.USER_PROFILE(id))
}

export const updateUser = async (id: string, data: Partial<User>): Promise<User> => {
  return apiClient.put<User>(API_ENDPOINTS.USER_PROFILE(id), data)
}
