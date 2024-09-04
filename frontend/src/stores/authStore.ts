// src/stores/authStore.ts
import { create } from 'zustand';
import axios from 'axios';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: number; username: string } | null;
  login: (username: string, password: string, navigate: (path: string) => void) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: async (username, password, navigate) => {
    try {
      const response = await axios.get(`http://localhost:8081/users/username/${username}`);
      const user = response.data;

      if (user && user.passwordHash === password) {
        set({
          isAuthenticated: true,
          user: { id: user.id, username: user.username },
        });

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ id: user.id, username: user.username }));

        // Use the navigate function passed from the component
        navigate('/');
      } else {
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed, please check your credentials.');
    }
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  },
}));

