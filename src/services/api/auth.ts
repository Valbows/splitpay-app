import { User } from '../../types/auth.types';
import { api } from '../utils/api-client';
import { AUTH_ENDPOINTS } from '../../constants/api-endpoints';
import { setStoredToken, removeStoredToken } from '../utils/storage';

class AuthService {
  async login(credentials: { email: string; password: string }): Promise<User> {
    const response = await api.post<{ user: User; token: string }>(AUTH_ENDPOINTS.LOGIN, credentials);
    setStoredToken(response.token);
    return response.user;
  }

  async signup(data: { name: string; email: string; password: string }): Promise<User> {
    const response = await api.post<{ user: User; token: string }>(AUTH_ENDPOINTS.SIGNUP, data);
    setStoredToken(response.token);
    return response.user;
  }

  async logout(): Promise<void> {
    await api.post(AUTH_ENDPOINTS.LOGOUT);
    removeStoredToken();
  }
}

export const authService = new AuthService();
