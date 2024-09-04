// src/stores/favoritesStore.ts
import create from 'zustand';
import axios from 'axios';
import { useAuthStore } from './authStore';

interface Favorite {
  id: number;
  name: string;
  favorite: boolean;
  createdAt: string;
}

interface FavoritesState {
  favorites: Favorite[];
  fetchFavorites: () => void;
  toggleFavorite: (id: number) => void;
}

export const useFavoritesStore = create<FavoritesState>((set) => ({
  favorites: [],

  // Fetch the favorite conversion lists for the user
  fetchFavorites: async () => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      const response = await axios.get(`http://localhost:8081/conversion-lists/user/${user.id}`);
      set({ favorites: response.data });
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  },

  // Toggle favorite status for a conversion list
  toggleFavorite: async (id: number) => {
    try {
      await axios.put(`http://localhost:8081/conversion-lists/${id}/favorite`);
      set((state) => ({
        favorites: state.favorites.map((favorite) =>
          favorite.id === id ? { ...favorite, favorite: !favorite.favorite } : favorite
        ),
      }));
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  },
}));
